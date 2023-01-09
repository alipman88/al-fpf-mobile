import React from 'react'
import { Config } from '@common/config'
import { Linking } from 'react-native'
import { WebView as BaseWebView } from 'react-native-webview'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'
import navigationService from '@common/utils/navigationService'
import Spinner from 'react-native-loading-spinner-overlay'

import { BackButton } from '@core/Authenticated/Settings/components/BackButton'
import { Button } from '@components/Button'
import {
  composeRegex,
  composePathParams,
} from '@core/Authenticated/Tabs/Compose/parseUrl'
import {
  issueRegex,
  issuePathParams,
} from '@core/Authenticated/Tabs/Forum/parseUrl'
import { ErrorContainer, ErrorText } from './styledComponents'

// Directory URL regex
const directoryRegex = /^\/(d|directory)(\/.*)?$/
// Post submitted URL regex
const postSubmittedRegex = /(\?|&)mobile_submitted_content_type=(?<contentType>post|event)/
// Search URL regex
const searchRegex = /^\/search\/?(\?.*)?$/

/**
 * Render a generic error view with a reload button.
 */
const ErrorView = ({ reload }) => {
  return (
    <ErrorContainer>
      <Button onPress={reload}>Reload</Button>
      <ErrorText>An error occurred. Please try reloading.</ErrorText>
    </ErrorContainer>
  )
}

ErrorView.propTypes = {
  reload: PropTypes.func.isRequired,
}

/**
 * Render a native web view.
 */
export const WebView = (props) => {
  const webViewRef = React.useRef(null)
  const { source, onLoadStart, navigation, useBackButton, ...restProps } = props
  let [stack, setStack] = React.useState([source.uri])
  let [showError, setShowError] = React.useState(false)

  if (source.uri !== stack[0]) {
    setStack([source.uri])
  }

  const currentURI = stack[stack.length - 1]
  const newSource = { ...source, uri: currentURI }

  // Whitelisted origins - these include external domains we whitelist
  // so they don't open an empty browser tab.
  const whitelistedOrigins = [
    'https://js.stripe.com',
    'https://m.stripe.network',
    'https://bid.g.doubleclick.net',
    Config.WEBSITE_HOST,
  ]

  // Reset the web view to its initial page
  const reset = () => {
    setStack([source.uri])
    setShowError(false)
    webViewRef.current.reload()
  }

  const onBackPress = () => {
    // Note that we can't use WebView's goBack because we reset the source of
    // the WebView with each new request, which interrupts its internal stack.
    if (stack.length > 1) {
      stack = stack.slice(0, -1)
      setStack(stack)
    }
  }

  /**
   * Some request paths should be handled by navigating to an appropriate section
   * of the mobile app, rather than loading the requested page in the web view.
   *
   * @param {string} requestPath - the requested path, with the host removed.
   * @param {boolean} true if navigating, false if not handled.
   */
  const navigateForRequest = (requestPath) => {
    // Compose URL
    if (
      navigation.state.routeName !== 'Compose' &&
      composeRegex.test(requestPath)
    ) {
      navigationService.navigate('Compose', {
        ...composePathParams(requestPath),
      })
      return true
    }

    // Content submitted URL
    const submittedContentType = requestPath.match(postSubmittedRegex)?.groups
      ?.contentType
    if (submittedContentType) {
      navigationService.navigate('Compose', {
        postSubmittedConfirmation: true,
        submittedContentType,
      })
      return true
    }

    // Issue URL
    if (issueRegex.test(requestPath)) {
      navigationService.navigate('Forum', {
        ...issuePathParams(requestPath),
      })
      return true
    }

    // Directory URL
    if (
      navigation.state.routeName !== 'Directory' &&
      directoryRegex.test(requestPath)
    ) {
      navigationService.navigate('Directory', {
        sourceUrl: requestPath,
      })
      return true
    }

    // Search URL
    if (
      navigation.state.routeName !== 'Search' &&
      searchRegex.test(requestPath)
    ) {
      navigationService.navigate('Search', {
        sourceUrl: requestPath,
      })
      return true
    }

    return false
  }

  // Whitelisted WebView paths -
  // Sections of frontporchforum.com that should load inside the webview.
  // (External URLs and any other areas of the FPF website should open in a
  // browser tab.) When updating these paths, be sure to update the
  // @mobile_app_permitted_paths array in the Rails app's
  // ApplicationController#handle_mobile_app_request method.
  const whitelistedPaths = [
    '/calendar',
    '/compose',
    '/directory',
    '/d/',
    '/search',
  ]

  return (
    <>
      <BaseWebView
        {...restProps}
        ref={webViewRef}
        source={newSource}
        originWhitelist={whitelistedOrigins}
        applicationNameForUserAgent={`FpfMobileApp/802.${DeviceInfo.getVersion()}`}
        startInLoadingState={true}
        scalesPageToFit={false}
        setBuiltInZoomControls={false}
        renderLoading={() => <Spinner visible={true} />}
        onError={() => setShowError(true)}
        onHttpError={() => setShowError(true)}
        onShouldStartLoadWithRequest={(request) => {
          if (!request.url.startsWith(Config.WEBSITE_HOST)) return false

          const requestPath = request.url.replace(Config.WEBSITE_HOST, '')

          if (navigateForRequest(requestPath)) {
            return false
          }

          // Open whitelisted requests in the WebView
          const whitelistedPath = whitelistedPaths.find((path) =>
            requestPath.startsWith(path)
          )
          if (whitelistedPath) {
            // React Native WebViews only send headers on the initial page load
            // To work around this, track the current URL via component state,
            // and update the state when loading a new page to force a re-render
            // and re-send headers.

            // The WebView's URL hasn't changed - allow it to load
            if (request.url === currentURI) return true

            // POST requests should be allowed to load. As the request object does not
            // expose its HTTP method, a dummy method=post param may be appended to URLs
            // when submitting a form on the Rails side.
            if (/(\?|&)method=post/.test(request.url)) return true

            // The URL has changed - change state to ensure headers are sent
            stack = [...stack, request.url]
            setStack(stack)

            return false
          }

          // Open unpermitted requests in a mobile browser
          Linking.openURL(request.url)
          return false
        }}
        onLoadEnd={() => {
          if (useBackButton) {
            navigation.setParams({
              headerLeft:
                stack.length > 1 ? <BackButton onPress={onBackPress} /> : null,
            })
          }
        }}
      />
      {showError && <ErrorView reload={reset} />}
    </>
  )
}

WebView.propTypes = {
  navigation: PropTypes.object.isRequired,
  onLoadStart: PropTypes.func,
  source: PropTypes.object,
  useBackButton: PropTypes.bool,
}

WebView.defaultProps = {
  useBackButton: true,
}
