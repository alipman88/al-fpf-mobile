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
  PostContainerBordered,
  PostBodyContainer,
  PostDate,
  PostHeader,
  ShowMoreButton
} from './styledComponents'

export class Post extends React.Component {
  state = {
    showMore: false
  }

  toggleShowMore() {
    this.setState(state => ({ showMore: !state.showMore }))
  }

  render() {
    const {
      post,
      postTruncateLength,
      children,
      hasBorder,
      showIssueData,
      moreText
    } = this.props

    const Container = hasBorder ? PostContainerBordered : PostContainer
    const postInfo = showIssueData
      ? `${post.area_name} - No. ${post.issue_number} -`
      : ''

    return (
      <Container key={post.id}>
        <PostBodyContainer hasBorder={hasBorder}>
          <PostHeader>{post.title}</PostHeader>
          <PostAuthor>
            {postInfo} {post.user_first_name} {post.user_last_name} -{' '}
            {post.user_email} - {post.user_profile_name}
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
            {truncateText(
              post.content,
              postTruncateLength,
              !this.state.showMore
            )}
          </PostBody>
          {post.content.length > postTruncateLength && (
            <TouchableOpacity onPress={() => this.toggleShowMore()}>
              <ShowMoreButton>
                {moreText} {this.state.showMore ? 'less' : 'more'}
              </ShowMoreButton>
            </TouchableOpacity>
          )}
        </PostBodyContainer>
        {children}
      </Container>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  postTruncateLength: PropTypes.number.isRequired,
  children: PropTypes.element,
  hasBorder: PropTypes.bool,
  showIssueData: PropTypes.bool,
  moreText: PropTypes.string.isRequired
}
