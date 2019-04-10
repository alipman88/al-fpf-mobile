import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import format from 'date-fns/format'

import { truncateText } from '@common/utils/truncateText'
import { PostCategory } from '@components/PostCategory'

import {
  LinkText,
  PostAuthor,
  PostShared,
  PostBody,
  PostContainer,
  PostContainerBordered,
  PostBodyContainer,
  PostDate,
  PostHeader,
  PostLink,
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
      fetchSpecificIssue,
      children,
      hasBorder,
      showIssueData,
      onTapCategory,
      moreText,
      navigation
    } = this.props

    const Container = hasBorder ? PostContainerBordered : PostContainer
    const postInfo = showIssueData ? (
      <LinkText
        onPress={() =>
          fetchSpecificIssue(
            post.area_id,
            post.issue_id,
            post.issue_number,
            navigation
          )
        }
      >
        {post.area_name} - No. {post.issue_number}
      </LinkText>
    ) : (
      ''
    )

    return (
      <Container key={post.id}>
        <PostBodyContainer hasBorder={hasBorder}>
          <PostHeader>{post.title}</PostHeader>
          <PostAuthor>
            {postInfo}
            {showIssueData ? ' - ' : ''}
            {post.user_first_name} {post.user_last_name} -{' '}
            {post.user_profile_name}
          </PostAuthor>
          {post.is_shared_post && (
            <PostShared>
              Shared from a neighboring FPF (
              <PostLink
                onPress={() =>
                  fetchSpecificIssue(
                    post.area_id,
                    post.issue_id,
                    post.issue_number,
                    navigation
                  )
                }
              >
                See more postings
              </PostLink>
              )
            </PostShared>
          )}
          {Boolean(post.event.start_date) && (
            <PostDate>
              {format(new Date(post.event.start_date), 'MMM DD, YYYY') + ' '}
              {format(new Date(post.event.start_date), 'h:mm A')}
              {Boolean(post.event.end_date) &&
                ` - ${format(new Date(post.event.end_date), 'h:mm A')}`}
            </PostDate>
          )}
          {post.categories.map(category => (
            <TouchableOpacity
              key={category}
              onPress={() => onTapCategory(category)}
            >
              <PostCategory>{category}</PostCategory>
            </TouchableOpacity>
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
  onTapCategory: PropTypes.func,
  showIssueData: PropTypes.bool,
  fetchSpecificIssue: PropTypes.func,
  moreText: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
}

Post.defaultProps = {
  onTapCategory: () => {}
}
