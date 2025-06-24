import React from 'react'
import {
  RefreshControl,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { Config } from '@fpf/common/config'
import { WebView as BaseWebView } from 'react-native-webview'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'
import Spinner from 'react-native-loading-spinner-overlay'
import { useIsFocused } from '@react-navigation/native'

import { BackButton } from '@fpf/core/Authenticated/Settings/components/BackButton'
import { Button } from '@fpf/components/Button'
import { ErrorContainer, ErrorText } from './styledComponents'

import {
  calendarRegex,
  composeRegex,
  directoryRegex,
  forumRegex,
  postSubmittedRegex,
  searchRegex,
} from './pathRegexes'

// Whitelisted origins - these include external domains we whitelist
// so they don't open an empty browser tab.
const whitelistedOrigins = [
  'https://js.stripe.com',
  'https://m.stripe.network',
  'https://bid.g.doubleclick.net',
  Config.WEBSITE_HOST,
  'mailto:',
]

// Whitelisted WebView paths -
// Sections of frontporchforum.com that should load inside the webview.
// (External URLs and any other areas of the FPF website should open in a
// browser tab.)
const whitelistedPaths = [
  '/calendar',
  '^/compose',
  '^/directory',
  '^/d/',
  '/forum',
  '^/search',
]

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

// Style the ScrollView and WebView to take up the full view height
const styles = StyleSheet.create({
  view: { flex: 1, height: '100%' },
})

/**
 * Some request paths should be handled by navigating to an appropriate section
 * of the mobile app, rather than loading the requested page in the web view.
 *
 * @param {string} requestPath - the requested path, with the host removed.
 * @param {boolean} true if navigating, false if not handled.
 */
const navigateForRequest = (requestPath, route, navigation) => {
  // Calendar URL
  if (route.name !== 'Calendar' && calendarRegex.test(requestPath)) {
    navigation.navigate('Calendar', {
      sourceUrl: requestPath,
    })
    return true
  }

  // Compose URL
  if (route.name !== 'Compose' && composeRegex.test(requestPath)) {
    navigation.navigate('Compose', {
      sourceUrl: requestPath,
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

  // Forum URL
  if (route.name !== 'Forum' && forumRegex.test(requestPath)) {
    navigation.navigate('Forum', {
      sourceUrl: requestPath,
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

/**
 * Render a native web view.
 */
export const WebView = ({
  initialUrl,
  rootUrl,
  headers,
  reloadRootOnTabPress,
  scrollTopOnTabPress,
  placeholder,
  navigation,
  route,
  useBackButton = true,
  transferPageTitle = false,
  areaIdsBySlug,
  composeEmail,
  logoutUser,
  ...restProps
}) => {
  const webViewRef = React.useRef(null)
  const [sourceUrl, setSourceUrl] = React.useState(initialUrl)
  const [showError, setShowError] = React.useState(false)
  const [webViewLoading, setWebViewLoading] = React.useState(true)
  const isFocused = useIsFocused()

  // Update the nav header title to the page title
  const [pageTitle, setPageTitle] = React.useState('')
  React.useEffect(() => {
    if (pageTitle) {
      navigation.setOptions({ title: pageTitle })
    }
  }, [pageTitle, navigation])

  // When the initialUrl changes, update the sourceUrl. The initialUrl is a prop,
  // so the parent element can change it at any time, e.g. when a user taps on
  // a search result that opens the Directory tab to a new page.
  const prevInitialUrlRef = React.useRef() // track prev prop value
  React.useEffect(() => {
    if (initialUrl !== prevInitialUrlRef.current && initialUrl !== sourceUrl) {
      setSourceUrl(initialUrl)
      webViewRef.current?.reload()
    }
    prevInitialUrlRef.current = initialUrl
  }, [initialUrl, sourceUrl])

  // Reset the web view to its root page
  const reset = () => {
    setSourceUrl(rootUrl + `?cache-bust=${Date.now()}`)
    setShowError(false)
    webViewRef.current?.reload()
  }

  // Handle a tab press when the tab is already focused by resetting to root
  // or scrolling to top
  React.useEffect(() => {
    return navigation.addListener('tabPress', (e) => {
      if (isFocused) {
        if (reloadRootOnTabPress) {
          e.preventDefault()

          setSourceUrl(rootUrl + `?cache-bust=${Date.now()}`)
          setShowError(false)
          webViewRef.current?.reload()
        } else if (scrollTopOnTabPress) {
          e.preventDefault()

          // Scroll to the top of the webview (using injected javascript)
          // (react-navigation is supposed to handle this but doesn't for some reason)
          if (webViewRef.current) {
            webViewRef.current.injectJavaScript(`
             window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
             true; // Return true to indicate success
           `)
          }
        }
      }
    })
  }, [
    rootUrl,
    isFocused,
    reloadRootOnTabPress,
    scrollTopOnTabPress,
    navigation,
  ])

  // Handle pull down to reload the webview
  // https://github.com/react-native-webview/react-native-webview/issues/103#issuecomment-610731592
  const [height, setHeight] = React.useState(Dimensions.get('screen').height)
  const [isRefreshEnabled, setRefreshEnabled] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    webViewRef?.current?.reload()
  }, [])

  return (
    <ScrollView
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          enabled={isRefreshEnabled}
        />
      }
      style={styles.view}
    >
      {webViewLoading && placeholder}
      <BaseWebView
        {...restProps}
        ref={webViewRef}
        source={{ uri: sourceUrl, headers }}
        testID='webView'
        originWhitelist={whitelistedOrigins}
        applicationNameForUserAgent={`FpfMobileApp/802.${DeviceInfo.getVersion()}`}
        startInLoadingState={true}
        scalesPageToFit={false}
        allowsBackForwardNavigationGestures={true}
        decelerationRate={0.998}
        // Only support pull to refresh when scrolled to the top of the webview
        onScroll={(e) => setRefreshEnabled(e.nativeEvent.contentOffset.y === 0)}
        style={[styles.view, { height }, restProps.style]}
        basicAuthCredential={{
          username: 'staging',
          password: Config.BASIC_AUTH_PASSWORD,
        }}
        setBuiltInZoomControls={false}
        renderLoading={() => !refreshing && <Spinner visible={true} />}
        onError={() => setShowError(true)}
        onHttpError={() => setShowError(true)}
        onContentProcessDidTerminate={() => {
          // https://github.com/react-native-webview/react-native-webview/issues/3062#issuecomment-1647308356
          console.error('onContentProcessDidTerminate')
          webViewRef?.current?.reload()
        }}
        onRenderProcessGone={() => {
          // https://github.com/react-native-webview/react-native-webview/issues/3062#issuecomment-1711645611
          console.error('onRenderProcessGone')
          webViewRef?.current?.reload()
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.includes('/login')) {
            logoutUser(navigation)
            return false
          }

          if (request.url.startsWith('mailto:')) {
            composeEmail({ mailto: request.url })
            return false
          }

          if (!request.url.startsWith(Config.WEBSITE_HOST)) {
            return false
          }

          const requestPath = request.url.replace(Config.WEBSITE_HOST, '')

          if (navigateForRequest(requestPath, route, navigation)) {
            return false
          }

          if (!whitelistedPaths.find((path) => requestPath.match(path))) {
            return false
          }

          return true
        }}
        onLoadEnd={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
          setWebViewLoading(false)
          setRefreshing(false)

          // Show the back button when appropriate
          if (useBackButton) {
            const backButton = nativeEvent.canGoBack
              ? () => (
                  <BackButton onPress={() => webViewRef.current?.goBack()} />
                )
              : null
            navigation.setOptions({ headerLeft: backButton })
          }

          // Use the document title as the navbar title
          if (
            transferPageTitle &&
            nativeEvent.title &&
            // Android briefly uses the document path as the title, and we don't
            // want to set the nav title to "frontporchforum.com/forum"
            !nativeEvent.url?.endsWith(nativeEvent.title)
          ) {
            setPageTitle(nativeEvent.title)
          }
        }}
      />
      {showError && <ErrorView reload={reset} />}
    </ScrollView>
  )
}

WebView.propTypes = {
  initialUrl: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired,
  headers: PropTypes.object,
  reloadRootOnTabPress: PropTypes.bool,
  scrollTopOnTabPress: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  useBackButton: PropTypes.bool,
  transferPageTitle: PropTypes.bool,
  areaIdsBySlug: PropTypes.object.isRequired,
  composeEmail: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  placeholder: PropTypes.node,
}
