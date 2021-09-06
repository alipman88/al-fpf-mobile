import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@common/config'
import { WebView } from '@components/WebView'

export class Directory extends React.Component {
  render() {
    const { navigation } = this.props
    const accessToken = this.props.accessToken.toString()

    const sourceUrl =
      Config.WEBSITE_HOST + (navigation.getParam('sourceUrl') || '/directory')

    return (
      <WebView
        navigation={navigation}
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
}
