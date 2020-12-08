import React from 'react'
import { Config } from '@common/config'
import { Linking } from 'react-native'
import { WebView as BaseWebView } from 'react-native-webview'
import PropTypes from 'prop-types'
import navigationService from '@common/utils/navigationService'
import queryString from 'query-string'

export const WebView = props => {
  const { uri, onLoadStart, ...restProps } = props
  const [currentURI, setURI] = React.useState(props.source.uri)
  const newSource = { ...props.source, uri: currentURI }

  // Whitelisted origins - these include external domains we whitelist
  // so they don't open an empty browser tab.
  const whitelistedOrigins = [
    'https://js.stripe.com',
    'https://m.stripe.network',
    'https://bid.g.doubleclick.net',
    Config.WEBSITE_HOST
  ]

  // Mobile app paths -
  // Rather than loading in the webview, requests to these paths should be
  // intercepted, and trigger navigation to the appropriate section of the mobile
  // app with any necessary parameters captured via Regex.
  const composeRegex = /\/areas\/(?<areaId>[0-9]+)\/posts\/new\/?\?(?<query>.*)/

  // Whitelisted WebView paths -
  // Sections of frontporchforum.com that should load inside the webview.
  // (External URLs and any other areas of the FPF website should open in a
  // browser tab.) When updating these paths, be sure to update the
  // @mobile_app_permitted_paths array in the Rails app's
  // ApplicationController#handle_mobile_app_request method.
  const whitelistedPaths = ['/directory', '/dir/', '/d/']

  return (
    <BaseWebView
      {...restProps}
      source={newSource}
      originWhitelist={whitelistedOrigins}
      applicationNameForUserAgent={'FpfMobileApp/802'}
      onShouldStartLoadWithRequest={request => {
        if (!request.url.startsWith(Config.WEBSITE_HOST)) return false

        const requestPath = request.url.replace(Config.WEBSITE_HOST, '')

        // Handle post submission through the mobile app,
        // not the WebView-embedded version of frontporchforum.com
        const compose = requestPath.match(composeRegex)
        if (compose) {
          const query = queryString.parse(compose.groups.query, {
            arrayFormat: 'bracket'
          })
          navigationService.navigate('Compose', {
            categoryId: Number(query['category_id']),
            title: query['post[title]'],
            referencedProfileId: query['post[referenced_profile_id]']
          })
          return false
        }

        // Open whitelisted requests in the WebView
        const whitelistedPath = whitelistedPaths.find(path =>
          requestPath.startsWith(path)
        )
        if (whitelistedPath) {
          // React Native WebViews only send headers on the initial page load
          // To work around this, track the current URL via component state,
          // and update the state when loading a new page to force a re-render
          // and re-send headers.

          // The WebView's URL hasn't changed - allow it to load
          if (request.url === currentURI) return true

          // The URL has changed - change state to ensure headers are sent
          setURI(request.url)
          return false
        }

        // Open unpermitted requests in a mobile browser
        Linking.openURL(request.url)
        return false
      }}
    />
  )
}

WebView.propTypes = {
  onLoadStart: PropTypes.func,
  source: PropTypes.object,
  uri: PropTypes.string
}
