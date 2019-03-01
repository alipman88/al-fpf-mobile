import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import get from 'lodash/get'
import range from 'lodash/range'

import { ScreenContainer } from '@components/ScreenContainer'
import { Post } from '../Post'
import { Advertisement } from '../Advertisement'
import { InThisIssue } from '../InThisIssue'
import { OtherIssues } from '../OtherIssues'

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
    if (prevProps.areas !== this.props.areas) {
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
    const posts = this.props.posts[this.props.currentIssueNum] || []
    const ads = this.props.ads[this.props.currentIssueNum] || []

    const maxIndex = posts.length + Math.max(3, ads.length)
    const postRender = []
    let adOffset = 0
    for (let index = 0; index < maxIndex; index++) {
      // out of posts, no ads rendered yet
      if (index - adOffset >= posts.length && adOffset === 0 && adOffset[0]) {
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
      <ScreenContainer grey>
        <ScrollView>
          <OtherIssues />
          <InThisIssue />
          {postRender}
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
  currentAreaId: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
  currentIssueNum: PropTypes.number.isRequired
}
