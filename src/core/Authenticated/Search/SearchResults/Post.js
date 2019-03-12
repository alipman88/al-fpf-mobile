import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import format from 'date-fns/format'

import { truncateText } from '@common/utils/truncateText'

import {
  PostAuthor,
  PostBody,
  PostCategory,
  PostContainer,
  PostDate,
  PostHeader,
  ShowMoreButton
} from './styledComponents'

export class Post extends React.Component {
  state = {
    showMore: false
  }

  toggleShowMore() {
    this.setState({ showMore: !this.state.showMore })
  }

  render() {
    const { post, postTruncateLength } = this.props

    return (
      <PostContainer key={post.id}>
        <PostHeader>{post.title}</PostHeader>
        <PostAuthor>
          {post.area_name} - No. {post.issue_number} - {post.user_first_name}{' '}
          {post.user_last_name} - {post.user_email} - {post.user_profile_name}
        </PostAuthor>
        {Boolean(post.event.start_date) && (
          <PostDate>
            {format(new Date(post.event.start_date), 'MM dd, YYYY')}
            {Boolean(post.event.end_date) &&
              `- ${format(new Date(post.event.end_date), 'MM dd, YYYY')}`}
          </PostDate>
        )}
        {post.categories.map(category => (
          <PostCategory key={category}>{category}</PostCategory>
        ))}
        <PostBody>
          {truncateText(post.content, postTruncateLength, !this.state.showMore)}
        </PostBody>
        {post.content.length > postTruncateLength && (
          <TouchableOpacity onPress={() => this.toggleShowMore()}>
            <ShowMoreButton>
              Read {this.state.showMore ? 'less' : 'more'}
            </ShowMoreButton>
          </TouchableOpacity>
        )}
      </PostContainer>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  postTruncateLength: PropTypes.number.isRequired
}
