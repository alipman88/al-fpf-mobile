import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { Config } from '@common/config'
import { WebView } from '@components/WebView'

export class Search extends React.Component {
  render() {
    const { navigation } = this.props
    const accessToken = this.props.accessToken.toString()

    let sourceUrl =
      Config.WEBSITE_HOST + (navigation.getParam('sourceUrl') || '/search')

    const searchParams = navigation.getParam('searchParams')
    if (searchParams) {
      sourceUrl = queryString.stringifyUrl({
        url: sourceUrl,
        query: searchParams,
      })
    }

    return (
      <WebView
        navigation={navigation}
        source={{
          uri: sourceUrl,
          headers: {
            authorization: accessToken,
          },
        }}
        useBackButton={false}
      />
    )
  }
}

Search.propTypes = {
  accessToken: PropTypes.string,
  navigation: PropTypes.object.isRequired,
}
