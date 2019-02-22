import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'

import { ScreenContainer } from '@components/ScreenContainer'
import { Post } from './posts/components/Post'

export class Forum extends React.Component {
  static navigationOptions = {
    title: 'Forum'
  }

  componentDidMount() {
    this.props.setupForumData()
  }

  render() {
    const posts = this.props.posts[this.props.currentIssueNum] || []
    const postRender = posts.map(post => <Post post={post} key={post.id} />)
    return (
      <ScreenContainer grey>
        <ScrollView>{postRender}</ScrollView>
      </ScreenContainer>
    )
  }
}

Forum.propTypes = {
  setupForumData: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  currentIssueNum: PropTypes.number.isRequired
}
