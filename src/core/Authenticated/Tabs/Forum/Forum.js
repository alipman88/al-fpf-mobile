import React from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import messaging from '@react-native-firebase/messaging'

import { Config } from '@fpf/common/config'
import { WebView } from '@fpf/components/WebView'
import { ForumPlaceholder } from './ForumPlaceholder'

import {
  hasMessagingPermission,
  requestMessagingPermission,
} from '@fpf/common/notifications'

export class Forum extends React.Component {
  async componentDidMount() {
    this.configureNotifications()
  }

  componentWillUnmount() {
    if (this.unsubscribeTokenRefresh) {
      this.unsubscribeTokenRefresh()
      delete this.unsubscribeTokenRefresh
    }
  }

  /**
   * Configure Firebase messaging and notifications:
   * - request permission from the user if not already granted
   * - send notification token to the server if changed, and listen for new token
   * - listen for changes to the token
   */
  async configureNotifications() {
    // Request permission for remote notifications
    let permitted = await hasMessagingPermission()
    if (!permitted) {
      permitted = await requestMessagingPermission()
    }

    // Bail early if messaging permission is not granted
    if (!permitted) {
      return
    }

    const fcmToken = await messaging().getToken()
    console.log('fcm token:', fcmToken)
    if (this.props.fcmToken !== fcmToken) {
      this.props.sendNewFCMToken(fcmToken)
    }

    if (Platform.OS === 'ios') {
      const apnsToken = await messaging().getAPNSToken()
      console.log('apns token:', apnsToken)
    }

    // Listen for firebase notification token change, and send to server
    this.unsubscribeTokenRefresh = messaging().onTokenRefresh(
      async (fcmToken) => {
        this.props.sendNewFCMToken(fcmToken)
      },
    )
  }

  render() {
    const { navigation, route } = this.props
    const accessToken = this.props.accessToken.toString()

    const initialUrl =
      Config.WEBSITE_HOST + (route.params?.sourceUrl ?? route.path ?? '/forum')

    return (
      <WebView
        rootUrl={`${Config.WEBSITE_HOST}/forum`}
        initialUrl={initialUrl}
        headers={{ authorization: accessToken }}
        reloadRootOnTabPress={true}
        navigation={navigation}
        route={route}
        placeholder=<ForumPlaceholder />
        useBackButton={false}
        transferPageTitle={true}
      />
    )
  }
}

Forum.propTypes = {
  accessToken: PropTypes.string,
  fcmToken: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  sendNewFCMToken: PropTypes.func.isRequired,
}
