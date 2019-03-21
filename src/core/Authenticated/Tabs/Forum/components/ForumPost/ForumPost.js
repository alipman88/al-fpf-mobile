import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@components/Button'
import { Post } from '@components/Post'
import { Linking } from 'react-native'
import { PostButton } from './styledComponents'
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
      <PostButton>
        <Button
          color={'#fff'}
          onPress={() =>
            Linking.openURL(`mailto:${email}?subject=RE: ${title}`)
          }
        >
          Email author
        </Button>
      </PostButton>

      {!post.is_shared_post && (
        <PostButton>
          <Button
            color={'#fff'}
            onPress={() => onReplyPress({ parentPostId: id })}
          >
            Reply to forum
          </Button>
        </PostButton>
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
    />
  )
}

ForumPost.propTypes = {
  post: PropTypes.object.isRequired,
  onReplyPress: PropTypes.func.isRequired,
  postTruncateLength: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired
}
