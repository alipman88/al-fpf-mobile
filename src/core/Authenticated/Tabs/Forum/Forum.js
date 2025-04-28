import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@fpf/common/config'
import { WebView } from '@fpf/components/WebView'
import { ForumPlaceholder } from './ForumPlaceholder'

export class Forum extends React.Component {
  render() {
    const { navigation, route } = this.props
    const accessToken = this.props.accessToken.toString()

    const sourceUrl =
      Config.WEBSITE_HOST + (route.params?.sourceUrl ?? route.path ?? '/forum')

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
        placeholder=<ForumPlaceholder />
        useBackButton={false}
      />
    )
  }
}

Forum.propTypes = {
  accessToken: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}
