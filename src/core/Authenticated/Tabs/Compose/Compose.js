import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@common/config'
import { WebView } from '@components/WebView'
import navigationService from '@common/utils/navigationService'

import { Success } from './components/Success'

export class Compose extends React.Component {
  render() {
    const { navigation, navigateWithToken } = this.props
    const accessToken = this.props.accessToken.toString()

    // Use a dummy URL param which may be incremented to
    // reset the compose tab and clear its form inputs after dismissing the success modal.
    //
    // NOTE: It would be cleaner to trigger the WebView's built-in reset function,
    // if that function can be triggered externally.
    const resetToken = navigation.getParam('resetToken') || 0

    const {
      areaId,
      categoryId,
      parentPostId,
      referencedProfileId,
      submittedContentType,
      title,
    } = navigation.state.params || {}
    let params = []
    params.push(`area_id=${areaId || ''}`)
    params.push(`category_id=${categoryId || ''}`)
    params.push(`post[parent_post_id]=${parentPostId || ''}`)
    params.push(`post[referenced_profile_id]=${referencedProfileId || ''}`)
    params.push(`post[title]=${title || ''}`)
    params.push(`resetToken=${resetToken}`)
    const query = params.join('&')
    const sourceUrl = `${Config.WEBSITE_HOST}/compose?${query}`

    let modalVisible = !!submittedContentType

    return (
      <React.Fragment>
        <WebView
          navigation={navigation}
          source={{
            uri: sourceUrl,
            headers: {
              authorization: accessToken,
            },
          }}
          useBackButton={false}
        />
        {modalVisible && (
          <Success
            contentType={submittedContentType || 'post'}
            navigateWithToken={navigateWithToken}
            onClose={() => {
              navigation.setParams({
                submittedContentType: null,
                resetToken: resetToken + 1,
              })
              navigationService.navigate('Forum')
            }}
          />
        )}
      </React.Fragment>
    )
  }
}

Compose.propTypes = {
  accessToken: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
}
