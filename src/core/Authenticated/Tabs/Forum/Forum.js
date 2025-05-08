import React from 'react'
import PropTypes from 'prop-types'

import { Config } from '@fpf/common/config'
import { WebView } from '@fpf/components/WebView'
import { ForumPlaceholder } from './ForumPlaceholder'

import messaging from '@react-native-firebase/messaging'
import {
  hasMessagingPermission,
  requestMessagingPermission,
} from '@fpf/common/notifications'

export class Forum extends React.Component {
  async componentDidMount() {
    this.configureNotifications()

    // Check for notification that triggered the application to open
    const remoteMessage = await messaging().getInitialNotification()
    if (remoteMessage) {
      this.handleNotificationOpen(remoteMessage)
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeTokenRefresh) {
      this.unsubscribeTokenRefresh()
      delete this.unsubscribeTokenRefresh
    }

    if (this.unsubscribeNotificationOpenedApp) {
      this.unsubscribeNotificationOpenedApp()
      delete this.unsubscribeNotificationOpenedApp
    }
  }

  /**
   * Configure Firebase messaging and notifications:
   * - request permission from the user if not already granted
   * - send notification token to the server if changed, and listen for new token
   * - listen for background and foreground notifications
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
    if (this.props.fcmToken !== fcmToken) {
      this.props.sendNewFCMToken(fcmToken)
    }

    // Listen for firebase notification token change, and send to server
    this.unsubscribeTokenRefresh = messaging().onTokenRefresh(
      async (fcmToken) => {
        this.props.sendNewFCMToken(fcmToken)
      },
    )

    // Listen for app background notification, and handle the notification
    this.unsubscribeNotificationOpenedApp = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        this.handleNotificationOpen(remoteMessage)
      },
    )
  }

  /**
   * Handle a notification message that was used to open the app (or bring it to
   * the foreground) by fetching the issue specified in the message data and
   * navigating to that issue.
   *
   * @param remoteMessage {RemoteMessage} Firebase message
   */
  handleNotificationOpen(remoteMessage) {
    const { navigation } = this.props
    const { area_id, issue_number } = JSON.parse(remoteMessage.data.payload)

    const sourceUrl = `/${area_id}/forum/archive/${issue_number}`
    navigation.navigate('Forum', { sourceUrl })
  }

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
