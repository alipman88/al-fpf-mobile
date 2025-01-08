import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { Config } from '@fpf/common/config'
import { WebView } from '@fpf/components/WebView'

export class Search extends React.Component {
  render() {
    const { navigation, route } = this.props
    const accessToken = this.props.accessToken.toString()

    let sourceUrl = Config.WEBSITE_HOST + (route.params?.sourceUrl ?? '/search')

    const searchParams = route.params?.searchParams
    if (searchParams) {
      sourceUrl = queryString.stringifyUrl({
        url: sourceUrl,
        query: searchParams,
      })
    }

    return (
      <WebView
        navigation={navigation}
        route={route}
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
  route: PropTypes.object.isRequired,
}
