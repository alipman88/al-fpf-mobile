import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@fpf/common/config'
import { WebView } from '@fpf/components/WebView'

import { DirectoryPlaceholder } from './DirectoryPlaceholder'

export class Directory extends React.Component {
  render() {
    const { navigation, route } = this.props
    const accessToken = this.props.accessToken.toString()

    const initialUrl =
      Config.WEBSITE_HOST +
      (route.params?.sourceUrl ?? route.path ?? '/directory')

    return (
      <WebView
        rootUrl={`${Config.WEBSITE_HOST}/directory`}
        initialUrl={initialUrl}
        headers={{ authorization: accessToken }}
        reloadRootOnTabPress={true}
        navigation={navigation}
        route={route}
        placeholder=<DirectoryPlaceholder />
      />
    )
  }
}

Directory.propTypes = {
  accessToken: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}
