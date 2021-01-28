import React from 'react'
import PropTypes from 'prop-types'
import { Config } from '@common/config'
import { WebView } from '@components/WebView'

export class Directory extends React.Component {
  render() {
    const accessToken = this.props.accessToken.toString()

    return (
      <WebView
        source={{
          uri: Config.WEBSITE_HOST + '/directory',
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
}
