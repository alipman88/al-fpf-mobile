import React from 'react'
import { Linking, Platform, TouchableOpacity } from 'react-native'
import Autolink from 'react-native-autolink'
import firebase from 'react-native-firebase'
import PropTypes from 'prop-types'

import format from 'date-fns/format'

import { truncateText } from '@common/utils/truncateText'
import { PostCategory } from '@components/PostCategory'
import { Button } from '@components/Button'
import { chooseMailApp } from '@common/utils/chooseMailApp'

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
  ShowMoreButton,
  Bottom,
  BottomBordered,
  ButtonWrapper,
  ButtonSpacer,
  AutoPostLinkStyle
} from './styledComponents'

export class Post extends React.Component {
  state = {
    showMore: false
  }

  toggleShowMore() {
    this.setState(state => ({ showMore: !state.showMore }))
  }

  handleReplyPress = ({ parentPostId, areaId }) => {
    this.props.navigation.navigate({
      routeName: 'Compose',
      params: { parentPostId, areaId }
    })
  }

  render() {
    const {
      post,
      areasIdMap,
      postTruncateLength,
      fetchSpecificIssue,
      children,
      hasBorder,
      includeBottomButtons,
      showIssueData,
      onTapCategory,
      moreText,
      navigation,
      showDatePublished
    } = this.props

    const Container = hasBorder ? PostContainerBordered : PostContainer
    const BottomContainer = hasBorder ? BottomBordered : Bottom
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

    const getBottomButtons = post => {
      const includeReplyButton =
        !post.is_shared_post && areasIdMap[post.area_id]
      const postAnalyticsData = {
        area_id: post.area_id,
        post_id: post.id,
        issue_id: post.issue_id
      }
      return (
        <BottomContainer>
          <ButtonWrapper>
            <Button
              color={'#fff'}
              onPress={async () => {
                firebase
                  .analytics()
                  .logEvent('press_email_author', postAnalyticsData)

                if (Platform.OS === 'ios') {
                  chooseMailApp({
                    title: 'Email author',
                    subject: `RE: ${post.title}`,
                    toEmail: post.user_email
                  })
                } else {
                  Linking.openURL(
                    `mailto:${post.user_email}?subject=RE: ${post.title}`
                  )
                }
              }}
              fullWidth
            >
              Email author
            </Button>
          </ButtonWrapper>

          {includeReplyButton && (
            <React.Fragment>
              <ButtonSpacer />
              <ButtonWrapper>
                <Button
                  color={'#fff'}
                  onPress={() => {
                    firebase
                      .analytics()
                      .logEvent('press_reply_to_forum', postAnalyticsData)
                    this.handleReplyPress({
                      parentPostId: post.id,
                      areaId: post.area_id
                    })
                  }}
                >
                  Reply to forum
                </Button>
              </ButtonWrapper>
            </React.Fragment>
          )}
        </BottomContainer>
      )
    }

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
              Event:{' '}
              {format(new Date(post.event.start_date), 'MMM DD, YYYY h:mm A')}
              {Boolean(post.event.end_date) &&
                ` - ${format(new Date(post.event.end_date), 'h:mm A')}`}
            </PostDate>
          )}
          {showDatePublished && Boolean(post.date_published) && (
            <PostDate>{format(post.date_published, 'MMM DD, YYYY')}</PostDate>
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
            <Autolink
              text={truncateText(
                post.content,
                postTruncateLength,
                !this.state.showMore
              )}
              linkStyle={AutoPostLinkStyle.link}
            />
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
        {includeBottomButtons && getBottomButtons(post)}
      </Container>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  areasIdMap: PropTypes.object,
  postTruncateLength: PropTypes.number.isRequired,
  children: PropTypes.element,
  includeBottomButtons: PropTypes.bool,
  hasBorder: PropTypes.bool,
  onTapCategory: PropTypes.func,
  showIssueData: PropTypes.bool,
  fetchSpecificIssue: PropTypes.func,
  moreText: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  showDatePublished: PropTypes.bool
}

Post.defaultProps = {
  onTapCategory: () => {}
}
