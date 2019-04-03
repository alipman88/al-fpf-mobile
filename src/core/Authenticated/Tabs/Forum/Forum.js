import React from 'react'
import PropTypes from 'prop-types'
import { RefreshControl, ScrollView } from 'react-native'
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

import { createChannel, displayNotification } from '@common/notifications'

export class Forum extends React.Component {
  async componentDidMount() {
    this.props.setupForumData()
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
        enabled = true
      } catch (error) {
        // User has rejected permissions. We dont do anything, because that's fine
      }
    }

    if (enabled) {
      const channel = createChannel()

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
    }
  }

  componentWillUnmount() {
    if (this.onTokenRefreshListener) {
      this.onTokenRefreshListener()
    }
    if (this.notificationListener) {
      this.notificationListener()
    }
  }

  fetchIssues(prevProps) {
    const { currentAreaId, areas } = this.props

    if (
      currentAreaId !== 0 &&
      (prevProps.areas !== areas || prevProps.currentAreaId !== currentAreaId)
    ) {
      this.setTitleFromArea()
      this.props.getIssues(this.props.currentAreaId)
    }
  }

  fetchPosts(prevProps) {
    const { issues, navigation, setAppError } = this.props

    if (prevProps.issues !== issues) {
      //if we got here from a deeplink, find issue and set current ID
      const issueNum = parseInt(navigation.getParam('issueNum', 0), 10)

      if (!!issueNum && issues.length) {
        navigation.setParams({ issueNum: undefined })
        const current = issues.find(i => i.number === issueNum)
        if (current && current.id !== this.props.currentIssueId) {
          this.props.setCurrentIssueId(current.id)
        } else if (!current) {
          setAppError(
            `Cannot load issue #${issueNum}, viewing latest for Forum`
          )
        }
      }
      // if this list of issues doesnt have the current id, set a new one
      if (
        issues.length > 0 &&
        !issues.find(issue => issue.id === this.props.currentIssueId)
      ) {
        this.props.setCurrentIssueId(this.props.issues[0].id)
      }
    }

    if (prevProps.currentIssueId !== this.props.currentIssueId) {
      this.props.getPosts(this.props.currentIssueId)
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

  handleReplyPress = ({ parentPostId, subject }) => {
    this.props.navigation.navigate({
      routeName: 'Compose',
      params: { parentPostId, subject }
    })
  }

  render() {
    const { currentIssueId, issues, loading } = this.props

    const posts = this.props.posts[currentIssueId] || []
    const shared_posts = this.props.shared_posts[currentIssueId] || []
    const ads = this.props.ads[currentIssueId] || []

    const maxIndex =
      posts.length + shared_posts.length + Math.max(3, ads.length)
    const postRender = []
    let adOffset = 0
    for (let index = 0; index < maxIndex; index++) {
      // out of posts, no ads rendered yet
      if (index - adOffset >= posts.length && adOffset === 0 && ads[0]) {
        const ad = ads[adOffset]
        // add one ad, then exit
        postRender.push(<Advertisement ad={ad} key={ad.id} />)
        break
      }

      if (ads[adOffset] && (index === 2 || index === 4 || index === 6)) {
        const ad = ads[adOffset]
        adOffset++

        postRender.push(<Advertisement ad={ad} key={ad.id} />)
      } else if (posts[index - adOffset]) {
        const post = posts[index - adOffset]
        postRender.push(
          <ForumPost
            post={post}
            navigation={this.props.navigation}
            onReplyPress={this.handleReplyPress}
            key={post.id}
          />
        )
      } else if (shared_posts[index - adOffset - posts.length]) {
        const shared_post = shared_posts[index - adOffset - posts.length]
        postRender.push(
          <ForumPost
            post={shared_post}
            navigation={this.props.navigation}
            onReplyPress={this.handleReplyPress}
            key={shared_post.id}
          />
        )
      }
    }

    const currentIssue = issues.find(issue => issue.id === currentIssueId)

    return (
      <ScreenContainer withPadding={false} grey>
        <ScrollView
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
              <InThisIssue number={currentIssue.number} />
            )}
            {postRender}
            {get(issues, '[0].id', 0) === currentIssueId ? (
              <NeighboringContent />
            ) : null}
          </ForumContainer>
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
  getPosts: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  neighboringAreas: PropTypes.object.isRequired,
  sendNewFCMToken: PropTypes.func.isRequired,
  setAppError: PropTypes.func.isRequired,
  setCurrentAreaId: PropTypes.func.isRequired,
  setCurrentIssueId: PropTypes.func.isRequired,
  setupForumData: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  shared_posts: PropTypes.object.isRequired
}
