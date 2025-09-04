import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@fpf/common/config'
import { WebView } from '@fpf/components/WebView'

import { ComposePlaceholder } from './ComposePlaceholder'
import { Success } from './components/Success'

export class Compose extends React.Component {
  componentDidMount() {
    const { navigation } = this.props

    this.unsubscribeBlurListener = navigation.addListener('blur', () => {
      this.blur()
    })
  }

  componentWillUnmount() {
    if (this.unsubscribeBlurListener) {
      this.unsubscribeBlurListener()
    }
  }

  blur() {
    const { route } = this.props
    if (this.modalVisible || route.params?.postSubmittedConfirmation) {
      this.reset()
    }
  }

  reset() {
    const { navigation } = this.props

    navigation.setParams({
      submittedContentType: null,
      resetToken: this.resetToken + 1,
    })
  }

  render() {
    const { navigation, navigateWithToken, route } = this.props
    const accessToken = this.props.accessToken.toString()
    const initialUrl = new URL(
      route.params?.sourceUrl ?? route.path ?? '/compose',
      Config.WEBSITE_HOST,
    )
    initialUrl.searchParams.set('resetToken', this.resetToken)

    const submittedContentType = route.params?.submittedContentType || 'post'

    return (
      <React.Fragment>
        <WebView
          rootUrl={`${Config.WEBSITE_HOST}/compose`}
          initialUrl={initialUrl.toString()}
          headers={{ authorization: accessToken }}
          scrollTopOnTabPress={true}
          navigation={navigation}
          route={route}
          placeholder=<ComposePlaceholder />
          useBackButton={false}
        />
        {this.modalVisible && (
          <Success
            contentType={submittedContentType}
            navigateWithToken={navigateWithToken}
            onClose={() => {
              navigation.navigate('Forum')
            }}
          />
        )}
      </React.Fragment>
    )
  }

  // resetToken is added the the WebView's URL as a dummy query param.
  // It is incremented upon dismissing the success modal to reset the
  // Compose tab and clear its form inputs.
  //
  // NOTE: It would be cleaner to trigger the WebView's built-in reset
  // function, if that function can be triggered externally.
  get resetToken() {
    const { route } = this.props
    return route.params?.resetToken ?? 0
  }

  get modalVisible() {
    const { route } = this.props
    return !!route.params?.submittedContentType
  }
}

Compose.propTypes = {
  accessToken: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
}
