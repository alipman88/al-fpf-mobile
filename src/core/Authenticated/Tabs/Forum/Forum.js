import React from 'react'
import PropTypes from 'prop-types'
import {
  AppState,
  Platform,
  PushNotificationIOS,
  RefreshControl,
  ScrollView
} from 'react-native'
import get from 'lodash/get'
import firebase from 'react-native-firebase'
import Toast from 'react-native-easy-toast'

import { ScreenContainer } from '@components/ScreenContainer'
import { ForumContainer } from './styledComponents'
import { ForumPost } from './components/ForumPost'
import { Advertisement } from './components/Advertisement'
import { InThisIssue } from './components/InThisIssue'
import { OtherIssues } from './components/OtherIssues'
import { NeighboringContent } from './components/NeighboringContent'
import { OcmMessage } from './components/OcmMessage'

import { createChannel, displayNotification } from '@common/notifications'

export class Forum extends React.Component {
  async componentDidMount() {
    // reset issue/area id to 0 so we fetch the default on fresh launch (notification handler is after this)
    this.resetIssueAndArea()

    AppState.addEventListener('change', this.handleAppStateChange)

    this.props.setupForumData(this.props.navigation)
    this.setTitleFromArea()

    const fcmToken = await firebase.messaging().getToken()
    if (this.props.fcmToken !== fcmToken) {
      this.props.sendNewFCMToken(fcmToken)
    }

    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(async fcmToken => {
        this.props.sendNewFCMToken(fcmToken)
      })

    let enabled = await firebase.messaging().hasPermission()
    if (!enabled) {
      try {
        await firebase.messaging().requestPermission()

        // Some iOS devices need to explicitly register. See https://github.com/invertase/react-native-firebase/pull/1626 and https://rnfirebase.io/docs/v5.x.x/messaging/reference/IOSMessaging
        await firebase.messaging().registerForRemoteNotifications()

        enabled = true
      } catch (error) {
        // User has rejected permissions. We dont do anything, because that's fine
      }
    }

    if (enabled) {
      const channel = createChannel()

      const notificationOpen = await firebase
        .notifications()
        .getInitialNotification()
      if (notificationOpen) {
        this.handleNotificationOpen(notificationOpen)
      }

      this.messageListener = firebase
        .messaging()
        .onMessage(message => console.log('on message', message))

      this.notificationListener = firebase
        .notifications()
        .onNotification(notification => {
          displayNotification(
            channel,
            notification._notificationId,
            notification._title,
            notification._body,
            notification._data
          )
        })

      this.notificationOpenedListener = firebase
        .notifications()
        .onNotificationOpened(notificationOpen => {
          this.handleNotificationOpen(notificationOpen)
        })
    }
  }

  componentWillUnmount() {
    if (this.onTokenRefreshListener) {
      this.onTokenRefreshListener()
    }
    if (this.notificationListener) {
      this.notificationListener()
    }
    if (this.notificationOpenedListener) {
      this.notificationOpenedListener()
    }
  }

  resetIssueAndArea() {
    this.props.setCurrentIssueId(0)
    this.props.setCurrentAreaId(0)
  }

  handleAppStateChange = state => {
    if (state === 'unknown') {
      // reset issue/area id to 0 so we fetch the default on fresh launch (notification handler is after this)
      this.resetIssueAndArea()
    } else if (state === 'active') {
      if (Platform.OS === 'ios') {
        // reset issue/area id to 0 so we fetch the default if badge icon is present
        PushNotificationIOS.getApplicationIconBadgeNumber(badgeNumber => {
          if (badgeNumber >= 1) {
            this.resetIssueAndArea()
            this.props.setupForumData()
          }
        })
      }
    }
  }

  fetchIssues(prevProps) {
    const { currentAreaId, areas } = this.props

    if (
      currentAreaId !== 0 &&
      (prevProps.areas !== areas || prevProps.currentAreaId !== currentAreaId)
    ) {
      this.setTitleFromArea()
      this.props.getIssues(this.props.currentAreaId, this.props.navigation)
    }
  }

  fetchPosts(prevProps) {
    const { currentAreaId, issues, navigation, navigateWithToken } = this.props

    if (prevProps.issues !== issues) {
      //if we got here from a deeplink, find issue and set current ID
      const issueNum = parseInt(navigation.getParam('issueNum', 0), 10)

      if (!!issueNum && issues.length) {
        navigation.setParams({ issueNum: undefined })
        const current = issues.find(i => i.number === issueNum)
        if (current && current.id !== this.props.currentIssueId) {
          this.props.setCurrentIssueId(current.id)
          this.props.toggleIssueUnread({
            id: current.id,
            isUnread: false,
            areaId: currentAreaId
          })
        } else if (!current) {
          navigateWithToken(`/areas/${currentAreaId}/issues/${issueNum}`)
        }
      }
      // if this list of issues doesnt have the current id, set a new one
      if (
        issues.length > 0 &&
        !issues.find(issue => issue.id === this.props.currentIssueId)
      ) {
        this.refs.forumViewRef.scrollTo({ y: 0 })
        this.props.setCurrentIssueId(this.props.issues[0].id)
        this.props.toggleIssueUnread({
          id: this.props.issues[0].id,
          isUnread: false,
          areaId: currentAreaId
        })
      }
    }

    if (
      prevProps.currentIssueId !== this.props.currentIssueId &&
      this.props.currentIssueId !== 0
    ) {
      // scroll to top any time we're rendering a different issue
      if (this.refs.forumViewRef) {
        this.refs.forumViewRef.scrollTo({ y: 0 })
      }
      this.props.getPosts(this.props.currentIssueId, this.props.navigation)
      this.props.toggleIssueUnread({
        id: this.props.currentIssueId,
        isUnread: false,
        areaId: currentAreaId
      })
    }
  }

  checkNavParams() {
    const { currentAreaId, navigation, setCurrentAreaId } = this.props

    const areaId = parseInt(navigation.getParam('areaId', 0), 10)
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
  }

  handleNotificationOpen(notificationOpen) {
    const notification = notificationOpen.notification
    const { area_id, issue_id, issue_number } = notification._data
    this.props.fetchSpecificIssue(
      parseInt(area_id, 10),
      parseInt(issue_id, 10),
      parseInt(issue_number, 10),
      this.props.navigation
    )
  }

  setTitleFromArea() {
    const currentArea = this.props.areas.find(
      a => a.id === this.props.currentAreaId
    )

    let name = ''
    if (currentArea) {
      name = get(currentArea, 'name', '')
    } else {
      name = this.props.neighboringAreas[this.props.currentAreaId]
    }

    this.props.navigation.setParams({
      navTitle: name
    })
  }

  render() {
    const { currentIssueId, issues, loading } = this.props

    const posts = (this.props.posts[currentIssueId] || []).concat(
      this.props.sharedPosts[currentIssueId] || []
    )
    const ads = this.props.ads[currentIssueId] || []

    const maxIndex = posts.length + Math.min(3, ads.length)
    const postRender = []
    let adOffset = 0

    for (let index = 0; index < maxIndex; index++) {
      // if we rendered all posts, render remaining ads
      if (index - adOffset >= posts.length) {
        const ad = ads[adOffset]
        postRender.push(<Advertisement ad={ad} key={ad.id} />)
        adOffset++
        // were in the middle of posts, and were on an even count
      } else if (ads[adOffset] && (index === 2 || index === 4 || index === 6)) {
        const ad = ads[adOffset]
        adOffset++

        postRender.push(<Advertisement ad={ad} key={ad.id} />)
      } else if (posts[index - adOffset]) {
        const post = posts[index - adOffset]
        postRender.push(
          <ForumPost
            post={post}
            navigation={this.props.navigation}
            key={post.id}
          />
        )
      }
    }

    const currentIssue = issues.find(issue => issue.id === currentIssueId)

    return (
      <ScreenContainer withPadding={false} grey>
        <ScrollView
          ref='forumViewRef'
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => this.props.getIssues(this.props.currentAreaId)}
            />
          }
        >
          <OtherIssues toast={this.toastRef} />
          <ForumContainer>
            {Boolean(currentIssue) && (
              <InThisIssue
                number={currentIssue.number}
                navigation={this.props.navigation}
              />
            )}
            {postRender}
            {get(issues, '[0].id', 0) === currentIssueId ? (
              <NeighboringContent />
            ) : null}
          </ForumContainer>
          {get(issues, '[0].id', 0) === currentIssueId ? <OcmMessage /> : null}
        </ScrollView>
        <Toast
          ref={toast => (this.toastRef = toast)}
          position='top'
          style={{ zIndex: 1000 }}
        />
      </ScreenContainer>
    )
  }
}

Forum.propTypes = {
  accessToken: PropTypes.string.isRequired,
  ads: PropTypes.object.isRequired,
  areas: PropTypes.array.isRequired,
  currentAreaId: PropTypes.number.isRequired,
  currentIssueId: PropTypes.number.isRequired,
  fcmToken: PropTypes.string,
  fetchSpecificIssue: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
  neighboringAreas: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  sendNewFCMToken: PropTypes.func.isRequired,
  setCurrentAreaId: PropTypes.func.isRequired,
  setCurrentIssueId: PropTypes.func.isRequired,
  setupForumData: PropTypes.func.isRequired,
  sharedPosts: PropTypes.object.isRequired,
  toggleIssueUnread: PropTypes.func.isRequired
}
