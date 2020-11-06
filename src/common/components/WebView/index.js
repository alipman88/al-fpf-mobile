import React, { useState } from 'react'
import { Config } from '@common/config'
import { Linking } from 'react-native'
import { WebView as BaseWebView } from 'react-native-webview'
import PropTypes from 'prop-types'

export const WebView = props => {
  const { uri, onLoadStart, ...restProps } = props
  const [currentURI, setURI] = useState(props.source.uri)
  const newSource = { ...props.source, uri: currentURI }

  // Whitelisted origins - these include external domains we whitelist
  // so they don't open an empty browser tab.
  const whitelistedOrigins = [
    'https://js.stripe.com',
    'https://m.stripe.network',
    'https://bid.g.doubleclick.net',
    Config.WEBSITE_HOST
  ]

  // Permitted paths - any other areas of the FPF website should open in a browser tab
  // When updating these paths, be sure to update the @mobile_app_permitted_paths array
  // in the Rails app's ApplicationController#handle_mobile_app_request method.
  const permittedPaths = ['/directory', '/dir/', '/d/']

  return (
    <BaseWebView
      {...restProps}
      source={newSource}
      originWhitelist={whitelistedOrigins}
      applicationNameForUserAgent={'FpfMobileApp/802'}
      onShouldStartLoadWithRequest={request => {
        if (!request.url.startsWith(Config.WEBSITE_HOST)) return false

        const permittedPath = permittedPaths.find(path =>
          request.url.startsWith(Config.WEBSITE_HOST + path)
        )

        if (!permittedPath) {
          Linking.openURL(request.url)
          return false
        }

        // React Native WebViews only send headers on the initial page load
        // To work around this, track the current URL via component state,
        // and update the state when loading a new page to force a re-render
        // and re-send headers.

        // The WebView's URL hasn't changed - allow it to load
        if (request.url === currentURI) return true

        // The URL has changed - change state to ensure headers are sent
        setURI(request.url)
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
