import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, ScrollView } from 'react-native'

import { createResetStackTo } from '@common/utils/navigation'
import { ScreenContainer } from '@components/ScreenContainer'
import { Text } from '@components/Text'
import { Post } from './posts/components/Post'

export class Forum extends React.Component {
  static navigationOptions = {
    title: 'Forum'
  }

  componentDidMount() {
    this.props.setupForumData()
  }

  render() {
    const { navigation, setAccessToken } = this.props
    const posts = this.props.posts[this.props.currentIssueNum]
    const postRender = posts.map(post => <Post post={post} key={post.id * Math.random()}/>)
    return (
      <ScreenContainer grey>
        <ScrollView >
          {postRender}
        </ScrollView>
      </ScreenContainer>
    )
  }
}

Forum.propTypes = {
  setupForumData: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  setAccessToken: PropTypes.func.isRequired
}
