import React from 'react'
import PropTypes from 'prop-types'
import { RefreshControl, ScrollView } from 'react-native'
import get from 'lodash/get'
import messaging from '@react-native-firebase/messaging'
import Toast from 'react-native-easy-toast'
import { useScrollToTop } from '@react-navigation/native'

import {
  hasMessagingPermission,
  requestMessagingPermission,
} from '@fpf/common/notifications'
import { plausible } from '@fpf/common/utils/plausible'
import { ScreenContainer } from '@fpf/components/ScreenContainer'
import { ExternalLink } from '@fpf/components/ExternalLink'
import { ForumContainer } from './styledComponents'
import { ForumPost } from './components/ForumPost'
import { Advertisement } from './components/Advertisement'
import { InThisIssue } from './components/InThisIssue'
import { OtherIssues } from './components/OtherIssues'
import { NeighboringContent } from './components/NeighboringContent'
import { ForumMessage } from './components/ForumMessage'

export class ForumComponent extends React.Component {
  constructor(props) {
    super(props)
    this.toastRef = React.createRef()
  }

  async componentDidMount() {
    this.setTitleFromArea()

    this.configureNotifications()

    // Check for notification that triggered the application to open
    const remoteMessage = await messaging().getInitialNotification()
    if (remoteMessage) {
      this.handleNotificationOpen(remoteMessage)
    } else {
      this.props.setupForumData(this.props.navigation)
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

    // Check for new firebase notification token and send to server
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
    const { area_id, issue_id, issue_number } = JSON.parse(
      remoteMessage.data.payload,
    )
    this.props.fetchSpecificIssue(
      parseInt(area_id, 10),
      parseInt(issue_id, 10),
      parseInt(issue_number, 10),
      this.props.navigation,
      this.props.setupForumData,
    )
  }

  fetchIssues(prevProps) {
    const { currentAreaId, areas, navigation } = this.props

    if (
      currentAreaId &&
      (prevProps.areas !== areas || prevProps.currentAreaId !== currentAreaId)
    ) {
      this.setTitleFromArea()
      if (currentAreaId !== prevProps.currentAreaId) {
        this.props.setCurrentIssueId(0)
        this.scrollPostsToTop()
      }
      this.props.getIssues(currentAreaId, navigation, this.props.setupForumData)
    }
  }

  fetchPosts(prevProps) {
    const { currentAreaId, issues, navigation, navigateWithToken, route } =
      this.props

    // Handle when the list of issues has changed
    if (prevProps.issues !== issues && issues.length > 0) {
      const issueNum = parseInt(route.params?.issueNum ?? 0, 10)

      // If an issue number is provided by routing, make use of it
      if (issueNum) {
        navigation.setParams({ issueNum: undefined })
        const current = issues.find((i) => i.number === issueNum)

        // If there's an issue available to show and it's different from the current
        // issue being shown, set the current issue id and mark it as read.
        if (current && current.id !== this.props.currentIssueId) {
          this.props.setCurrentIssueId(current.id)
          this.props.toggleIssueUnread({
            id: current.id,
            isUnread: false,
            areaId: currentAreaId,
          })
        }
        // Or, if the issue isn't available locally (e.g. because it's too old),
        // show it in a web browser
        else if (!current) {
          navigateWithToken(`/areas/${currentAreaId}/issues/${issueNum}`)
        }
      }
      // Otherwise, if the current issue id doesn't exist in the list of issues,
      // reset to the latest issue in the list of issues (and mark that issue read)
      else if (
        !issues.find((issue) => issue.id === this.props.currentIssueId)
      ) {
        this.scrollPostsToTop()
        this.props.setCurrentIssueId(issues[0].id)
        this.props.toggleIssueUnread({
          id: issues[0].id,
          isUnread: false,
          areaId: currentAreaId,
        })
      }
    }

    // Handle when the issue being viewed has changed
    if (
      prevProps.currentIssueId !== this.props.currentIssueId &&
      this.props.currentIssueId !== 0
    ) {
      this.scrollPostsToTop()
      this.props.getContents(this.props.currentIssueId, this.props.navigation)
      this.props.toggleIssueUnread({
        id: this.props.currentIssueId,
        isUnread: false,
        areaId: currentAreaId,
      })
    }
  }

  checkNavParams() {
    const { currentAreaId, navigation, route, setCurrentAreaId } = this.props

    const areaId = parseInt(route.params?.areaId ?? 0, 10)
    if (!!areaId && areaId !== currentAreaId) {
      setCurrentAreaId(areaId)
      // if theres no issue number, clear the area ID
      navigation.setParams({ areaId: undefined })
    }
  }

  componentDidUpdate(prevProps) {
    this.checkNavParams()
    this.fetchIssues(prevProps)
    this.fetchPosts(prevProps)

    // If a new issue is being loaded, log the pageview to plausible, mimicking
    // a web app url so that forum views from mobile and web are grouped together
    const { currentIssueId, currentAreaId, issues } = this.props
    const issue = issues.find((issue) => issue.id === currentIssueId)
    if (issue && currentIssueId !== prevProps.currentIssueId) {
      plausible.trackPageview({
        path: `areas/${currentAreaId}/issues/${issue.number}`,
      })
    }
  }

  scrollPostsToTop() {
    if (this.props.scrollViewRef?.current) {
      // using set timeout to ensure the code doesn't run until rendering is finished
      setTimeout(() => this.scrollToTop(this.props.scrollViewRef, false))
    }
  }

  scrollToTop(ref, animated = true) {
    if (ref.current) {
      ref.current.scrollTo({ y: 0, animated: animated })
    }
  }

  setTitleFromArea() {
    this.props.navigation.setOptions({
      headerTitle: this.areaName,
    })
  }

  get areaName() {
    const currentArea = this.props.areas.find(
      (a) => a.id === this.props.currentAreaId,
    )

    let name = ''
    if (currentArea) {
      name = get(currentArea, 'name', '')
    } else {
      name = this.props.neighboringAreas[this.props.currentAreaId]
    }

    return name
  }

  render() {
    const { currentIssueId, issues, loading, navigation, navigateWithToken } =
      this.props

    const posts = (this.props.posts[currentIssueId] || []).concat(
      this.props.sharedPosts[currentIssueId] || [],
    )
    const ads = this.props.ads[currentIssueId] || []
    const featuredAdCampaign = this.props.featuredAdCampaigns[currentIssueId]

    const maxIndex = posts.length + Math.min(3, ads.length)
    const postRender = []
    let adOffset = 0

    for (let index = 0; index < maxIndex; index++) {
      // if we rendered all posts, render remaining ads
      if (index - adOffset >= posts.length) {
        const ad = ads[adOffset]
        postRender.push(
          <Advertisement
            ad={ad}
            key={`ad-${ad.id}`}
            navigateWithToken={navigateWithToken}
          />,
        )
        adOffset++
        // were in the middle of posts, and were on an even count
      } else if (ads[adOffset] && (index === 2 || index === 4 || index === 6)) {
        const ad = ads[adOffset]
        adOffset++

        postRender.push(
          <Advertisement
            ad={ad}
            key={`ad-${ad.id}`}
            navigateWithToken={navigateWithToken}
          />,
        )
      } else if (posts[index - adOffset]) {
        const post = posts[index - adOffset]
        postRender.push(
          <ForumPost
            post={post}
            navigation={this.props.navigation}
            key={`post-${post.id}`}
          />,
        )
      }
    }

    const currentIssue = issues.find((issue) => issue.id === currentIssueId)

    return (
      <ScreenContainer withPadding={false} grey>
        <ScrollView
          ref={this.props.scrollViewRef}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                this.props.getIssues(this.props.currentAreaId)
                this.props.getContents(
                  this.props.currentIssueId,
                  this.props.navigation,
                  { force: true },
                )
              }}
            />
          }
        >
          <OtherIssues navigation={navigation} toast={this.toastRef} />
          <ForumContainer>
            {this.props.hasAreaAccess === false && (
              <ExternalLink
                content='You have no active profiles on your account! Create a new one at frontporchforum.com'
                onPress={() => navigateWithToken('/user')}
              />
            )}
            {featuredAdCampaign?.ad && (
              <Advertisement
                ad={featuredAdCampaign.ad}
                key={`ad-${featuredAdCampaign.ad.id}`}
                navigateWithToken={navigateWithToken}
              />
            )}
            {Boolean(currentIssue) && (
              <InThisIssue
                number={currentIssue.number}
                navigation={navigation}
              />
            )}
            {get(issues, '[0].id', 0) === currentIssueId ? (
              <ForumMessage />
            ) : null}
            {postRender}
            {get(issues, '[0].id', 0) === currentIssueId ? (
              <NeighboringContent navigation={navigation} />
            ) : null}
          </ForumContainer>
        </ScrollView>
        <Toast ref={this.toastRef} position='top' style={{ zIndex: 1000 }} />
      </ScreenContainer>
    )
  }
}

ForumComponent.propTypes = {
  ads: PropTypes.object.isRequired,
  areas: PropTypes.array.isRequired,
  currentAreaId: PropTypes.number,
  currentIssueId: PropTypes.number.isRequired,
  fcmToken: PropTypes.string,
  fetchSpecificIssue: PropTypes.func.isRequired,
  getContents: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
  hasAreaAccess: PropTypes.bool,
  issues: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
  neighboringAreas: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  scrollViewRef: PropTypes.object,
  sendNewFCMToken: PropTypes.func.isRequired,
  setCurrentAreaId: PropTypes.func.isRequired,
  setCurrentIssueId: PropTypes.func.isRequired,
  setupForumData: PropTypes.func.isRequired,
  sharedPosts: PropTypes.object.isRequired,
  featuredAdCampaigns: PropTypes.object.isRequired,
  toggleIssueUnread: PropTypes.func.isRequired,
}

export function Forum(props) {
  const ref = React.useRef(null)

  // Connect react navigation to the forum scroll view
  // https://reactnavigation.org/docs/use-scroll-to-top
  useScrollToTop(ref)

  return <ForumComponent {...props} scrollViewRef={ref} />
}
