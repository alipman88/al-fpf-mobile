import React from 'react'
import PropTypes from 'prop-types'
import { Post } from '@components/Post'

export const ForumPost = ({ post, postTruncateLength, navigation }) => {
  const onTapCategory = (categoryId) => {
    const searchParams = {
      index: 'posts',
      's[sent_at]': 'desc',
      'category_ids[]': categoryId,
    }
    navigation.navigate('Search', { searchParams })
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
  postTruncateLength: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
}

ForumPost.displayName = 'ForumPost'
