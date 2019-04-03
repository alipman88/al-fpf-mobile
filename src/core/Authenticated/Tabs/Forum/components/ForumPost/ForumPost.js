import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@components/Button'
import { Post } from '@components/Post'
import { Linking } from 'react-native'
import { Bottom } from '../sharedStyles'

export const ForumPost = ({
  post,
  onReplyPress,
  postTruncateLength,
  navigation
}) => {
  const { id, title, user_email: email } = post

  const onTapCategory = category => {
    navigation.navigate({ routeName: 'Search', params: { category } })
  }

  const bottomButtons = (
    <Bottom>
      <Button
        color={'#fff'}
        onPress={() => Linking.openURL(`mailto:${email}?subject=RE: ${title}`)}
        width={124}
      >
        Email author
      </Button>

      {!post.is_shared_post && (
        <Button
          color={'#fff'}
          onPress={() => onReplyPress({ parentPostId: id })}
          width={124}
        >
          Reply to forum
        </Button>
      )}
    </Bottom>
  )
  return (
    <Post
      post={post}
      postTruncateLength={postTruncateLength}
      children={bottomButtons}
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
