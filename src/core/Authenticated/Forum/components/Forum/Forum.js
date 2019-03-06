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

  componentDidUpdate(prevProps) {
    if (
      prevProps.areas !== this.props.areas ||
      prevProps.currentAreaId !== this.props.currentAreaId
    ) {
      this.setTitleFromArea()
    }
  }

  setTitleFromArea() {
    const currentArea = this.props.areas.find(
      a => a.id === this.props.currentAreaId
    )
    this.props.navigation.setParams({ navTitle: get(currentArea, 'name', '') })
  }

  handlePostButtonPress(type, target = null) {
    console.log('not implemented', type, target)
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
            onButtonPress={this.handlePostButtonPress}
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
  setupForumData: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  ads: PropTypes.object.isRequired,
  areas: PropTypes.array.isRequired,
  issues: PropTypes.array.isRequired,
  currentAreaId: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
  currentIssueId: PropTypes.number.isRequired
}
