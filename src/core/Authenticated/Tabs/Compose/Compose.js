import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@fpf/common/config'
import { WebView } from '@fpf/components/WebView'

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
    if (this.modalVisible) {
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
    const {
      areaId,
      categoryId,
      parentPostId,
      referencedProfileId,
      submittedContentType,
      title,
    } = route.params || {}
    let params = []
    params.push(`area_id=${areaId || ''}`)
    params.push(`category_id=${categoryId || ''}`)
    params.push(`post[parent_post_id]=${parentPostId || ''}`)
    params.push(`post[referenced_profile_id]=${referencedProfileId || ''}`)
    params.push(`post[title]=${title || ''}`)
    params.push(`resetToken=${this.resetToken}`)
    const query = params.join('&')
    const sourceUrl = `${Config.WEBSITE_HOST}/compose?${query}`

    return (
      <React.Fragment>
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
        {this.modalVisible && (
          <Success
            contentType={submittedContentType || 'post'}
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
