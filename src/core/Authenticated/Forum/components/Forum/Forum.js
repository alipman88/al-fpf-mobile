import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import get from 'lodash/get'

import { ScreenContainer } from '@components/ScreenContainer'
import { ForumContainer } from './styledComponents'
import { Post } from '../Post'
import { Advertisement } from '../Advertisement'
import { InThisIssue } from '../InThisIssue'
import { OtherIssues } from '../OtherIssues'
import { NeighboringContent } from '../NeighboringContent'

export class Forum extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params ? params.navTitle : 'Forum'
    }
  }

  componentDidMount() {
    this.props.setupForumData()
    this.setTitleFromArea()
  }

  fetchIssues(prevProps) {
    if (
      this.props.currentAreaId !== 0 &&
      (prevProps.areas !== this.props.areas ||
        prevProps.currentAreaId !== this.props.currentAreaId)
    ) {
      this.setTitleFromArea()
      this.props.getIssues(this.props.currentAreaId)
    }
  }

  fetchPosts(prevProps) {
    const { issues } = this.props

    if (prevProps.issues !== issues) {
      //if we got here from a deeplink, find issue and set current ID
      const issueNum = parseInt(
        this.props.navigation.getParam('issueNum', 0),
        10
      )

      if (!!issueNum && issues.length) {
        const current = issues.find(i => i.num === issueNum)
        if (current) this.props.setCurrentIssueId(current.id)
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
    const areaId = parseInt(this.props.navigation.getParam('areaId', 0), 10)
    if (!!areaId && areaId !== this.props.currentAreaId) {
      this.props.setCurrentAreaId(areaId)
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
    this.props.navigation.push('Compose', { parentPostId, subject })
  }

  render() {
    const { currentIssueId, issues } = this.props

    const posts = this.props.posts[currentIssueId] || []
    const ads = this.props.ads[currentIssueId] || []

    const maxIndex = posts.length + Math.max(3, ads.length)
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
          <Post
            post={post}
            onReplyPress={this.handleReplyPress}
            key={post.id}
          />
        )
      }
    }

    return (
      <ScreenContainer withPadding={false} grey>
        <ScrollView>
          <OtherIssues />
          <ForumContainer>
            <InThisIssue />
            {postRender}
            {get(issues, '[0].id', 0) === currentIssueId ? (
              <NeighboringContent />
            ) : null}
          </ForumContainer>
        </ScrollView>
      </ScreenContainer>
    )
  }
}

Forum.propTypes = {
  ads: PropTypes.object.isRequired,
  areas: PropTypes.array.isRequired,
  currentAreaId: PropTypes.number.isRequired,
  currentIssueId: PropTypes.number.isRequired,
  getPosts: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  neighboringAreas: PropTypes.object.isRequired,
  setCurrentAreaId: PropTypes.func.isRequired,
  setCurrentIssueId: PropTypes.func.isRequired,
  setupForumData: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
}
