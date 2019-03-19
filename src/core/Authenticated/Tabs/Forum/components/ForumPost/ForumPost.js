import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@components/Button'
import { Post } from '@components/Post'
import { Linking } from 'react-native'
import { PostButton } from './styledComponents'
import { Bottom } from '../sharedStyles'

export const ForumPost = ({ post, onReplyPress, postTruncateLength }) => {
  const { id, title, user_email: email } = post

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

      <PostButton>
        <Button
          color={'#fff'}
          onPress={() => onReplyPress({ parentPostId: id })}
        >
          Reply to forum
        </Button>
      </PostButton>
    </Bottom>
  )
  return (
    <Post
      post={post}
      postTruncateLength={postTruncateLength}
      children={bottomButtons}
      moreText={'Show'}
      hasBorder
    />
  )
}

ForumPost.propTypes = {
  post: PropTypes.object.isRequired,
  onReplyPress: PropTypes.func.isRequired,
  postTruncateLength: PropTypes.number.isRequired
}
