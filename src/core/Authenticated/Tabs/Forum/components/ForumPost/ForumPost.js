import React from 'react'
import PropTypes from 'prop-types'
import { Post } from '@components/Post'

export const ForumPost = ({
  post,
  onReplyPress,
  postTruncateLength,
  navigation
}) => {
  const onTapCategory = category => {
    navigation.navigate({ routeName: 'Search', params: { category } })
  }

  return (
    <Post
      post={post}
      postTruncateLength={postTruncateLength}
      includeBottomButtons
      moreText={'Show'}
      onTapCategory={onTapCategory}
      hasBorder
      tappableCategory
      navigation={navigation}
    />
  )
}

ForumPost.propTypes = {
  post: PropTypes.object.isRequired,
  onReplyPress: PropTypes.func.isRequired,
  postTruncateLength: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired
}

ForumPost.displayName = 'ForumPost'
