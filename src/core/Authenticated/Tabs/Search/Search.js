import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@fpf/common/config'
import { WebView } from '@fpf/components/WebView'

import { SearchPlaceholder } from './SearchPlaceholder'

export class Search extends React.Component {
  render() {
    const { navigation, route } = this.props
    const accessToken = this.props.accessToken.toString()

    const initialUrl =
      Config.WEBSITE_HOST + (route.params?.sourceUrl ?? route.path ?? '/search')

    return (
      <WebView
        rootUrl={`${Config.WEBSITE_HOST}/search`}
        initialUrl={initialUrl}
        headers={{ authorization: accessToken }}
        reloadRootOnTabPress={true}
        navigation={navigation}
        route={route}
        useBackButton={false}
        placeholder=<SearchPlaceholder />
      />
    )
  }
}

Search.propTypes = {
  accessToken: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}
