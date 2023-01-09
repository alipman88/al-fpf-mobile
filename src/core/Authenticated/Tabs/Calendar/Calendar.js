import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@common/config'
import { WebView } from '@components/WebView'

export class Calendar extends React.Component {
  render() {
    const { navigation } = this.props
    const accessToken = this.props.accessToken.toString()

    const sourceUrl =
      Config.WEBSITE_HOST + (navigation.getParam('sourceUrl') || '/calendar')

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

Calendar.propTypes = {
  accessToken: PropTypes.string,
  navigation: PropTypes.object.isRequired,
}
