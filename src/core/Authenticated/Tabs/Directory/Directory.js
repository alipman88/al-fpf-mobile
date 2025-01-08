import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@fpf/common/config'
import { WebView } from '@fpf/components/WebView'

export class Directory extends React.Component {
  render() {
    const { navigation, route } = this.props
    const accessToken = this.props.accessToken.toString()

    const sourceUrl =
      Config.WEBSITE_HOST + (route.params?.sourceUrl ?? '/directory')

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
      />
    )
  }
}

Directory.propTypes = {
  accessToken: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}
