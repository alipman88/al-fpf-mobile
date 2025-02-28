import React from 'react'
import { Config } from '@fpf/common/config'
import { Linking } from 'react-native'
import { WebView as BaseWebView } from 'react-native-webview'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'
import Spinner from 'react-native-loading-spinner-overlay'

import { BackButton } from '@fpf/core/Authenticated/Settings/components/BackButton'
import { Button } from '@fpf/components/Button'
import {
  composeRegex,
  composePathParams,
} from '@fpf/core/Authenticated/Tabs/Compose/parseUrl'
import {
  isIssuePath,
  issuePathParams,
} from '@fpf/core/Authenticated/Tabs/Forum/parseUrl'
import { ErrorContainer, ErrorText } from './styledComponents'

// Directory URL regex
const directoryRegex = /^\/(d|directory)(\/.*)?$/
// Post submitted URL regex
const postSubmittedRegex =
  /(\?|&)mobile_submitted_content_type=(?<contentType>post|event)/
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
export const WebView = ({
  source,
  placeholder,
  navigation,
  route,
  useBackButton = true,
  areaIdsBySlug,
  ...restProps
}) => {
  const webViewRef = React.useRef(null)
  let [stack, setStack] = React.useState([source.uri])
  let [showError, setShowError] = React.useState(false)
  let [webViewLoading, setWebViewLoading] = React.useState(true)

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
      setStack(stack.slice(0, -1))
    }
  }

  if (source.uri !== stack[0]) {
    setStack([source.uri])
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
    if (route.name !== 'Compose' && composeRegex.test(requestPath)) {
      navigation.navigate('Compose', {
        ...composePathParams(requestPath),
      })
      return true
    }

    // Content submitted URL
    const submittedContentType =
      requestPath.match(postSubmittedRegex)?.groups?.contentType
    if (submittedContentType) {
      navigation.navigate('Compose', {
        postSubmittedConfirmation: true,
        submittedContentType,
      })
      return true
    }

    // Issue URL
    if (isIssuePath(requestPath)) {
      const params = issuePathParams(requestPath)

      // If the URL includes an area slug rather than an area id, translate it
      if (params.areaSlug && !params.areaId) {
        params.areaId = areaIdsBySlug[params.areaSlug]
      }

      navigation.navigate('Forum', {
        ...params,
      })
      return true
    }

    // Directory URL
    if (route.name !== 'Directory' && directoryRegex.test(requestPath)) {
      navigation.navigate('Directory', {
        sourceUrl: requestPath,
      })
      return true
    }

    // Search URL
    if (route.name !== 'Search' && searchRegex.test(requestPath)) {
      navigation.navigate('Search', {
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
    '^/compose',
    '^/directory',
    '^/d/',
    '^/search',
  ]

  return (
    <>
      {webViewLoading && placeholder}
      <BaseWebView
        {...restProps}
        ref={webViewRef}
        source={newSource}
        testID='webView'
        originWhitelist={whitelistedOrigins}
        applicationNameForUserAgent={`FpfMobileApp/802.${DeviceInfo.getVersion()}`}
        startInLoadingState={true}
        scalesPageToFit={false}
        basicAuthCredential={{
          username: 'staging',
          password: Config.BASIC_AUTH_PASSWORD,
        }}
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
            requestPath.match(path),
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
          setWebViewLoading(false)

          // Show the back button when appropriate
          if (useBackButton) {
            const backButton =
              stack.length > 1
                ? () => <BackButton onPress={onBackPress} />
                : null
            navigation.setOptions({ headerLeft: backButton })
          }
        }}
      />
      {showError && <ErrorView reload={reset} />}
    </>
  )
}

WebView.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  source: PropTypes.object,
  useBackButton: PropTypes.bool,
  areaIdsBySlug: PropTypes.object.isRequired,
  placeholder: PropTypes.node,
}
