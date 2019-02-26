import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'

import { ScreenContainer } from '@components/ScreenContainer'
import { Post } from '../Post'
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
    const currentArea = this.props.areas.find(
      a => a.id === this.props.currentAreaId
    )
    this.props.navigation.setParams({ navTitle: currentArea.name })
  }

  handlePostButtonPress(type, target = null) {
    console.log('not implemented', type, target)
  }

  render() {
    const posts = this.props.posts[this.props.currentIssueNum] || []
    const postRender = posts.map(post => (
      <Post
        post={post}
        onButtonPress={this.handlePostButtonPress}
        key={post.id}
      />
    ))
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
  areas: PropTypes.array.isRequred,
  currentAreaId: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
  currentIssueNum: PropTypes.number.isRequired
}
