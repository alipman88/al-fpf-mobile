import React from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import Autolink from 'react-native-autolink'
import analytics from '@react-native-firebase/analytics'
import PropTypes from 'prop-types'
import { Text, TextSemibold } from '@components/Text'

import format from 'date-fns/format'

import { truncateText } from '@common/utils/truncateText'
import { PostCategory } from '@components/PostCategory'
import { Button } from '@components/Button'

import {
  LinkText,
  PostAuthor,
  PostShared,
  PostBody,
  PostContainer,
  PostContainerBordered,
  PostBodyContainer,
  PostDate,
  PostLocation,
  PostUrl,
  PostHeader,
  PostLink,
  CategoryPosts,
  ShowMoreButton,
  Bottom,
  BottomBordered,
  ButtonWrapper,
  ButtonSpacer,
  AutoPostLinkStyle,
  PillPrimary,
  PillText,
} from './styledComponents'

export class Post extends React.Component {
  state = {
    showMore: false,
  }

  toggleShowMore() {
    this.setState((state) => ({ showMore: !state.showMore }))
  }

  showDirectoryListing(profile) {
    const listingPath = `/d/${profile.slug || profile.id}`
    this.props.navigation.navigate('Directory', {
      sourceUrl: listingPath,
    })
  }

  reTitle(title, prefix = 'Re:') {
    return title.toLowerCase().startsWith(prefix.toLowerCase())
      ? title
      : `${prefix} ${title}`
  }

  handleReplyPress = (post) => {
    this.props.navigation.navigate({
      routeName: 'Compose',
      params: {
        areaId: post.area_id,
        categoryId: null,
        parentPostId: post.id,
        referencedProfileId: null,
        title: this.reTitle(post.title),
      },
    })
  }

  render() {
    const {
      post,
      areasIdMap,
      fullAreasIdMap,
      chooseMailApp,
      postTruncateLength,
      fetchSpecificIssue,
      children,
      hasBorder,
      includeBottomButtons,
      showIssueData,
      onTapCategory,
      moreText,
      navigation,
      categories,
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

    const getBottomButtons = (post) => {
      const includeReplyButton =
        !post.is_shared_post && areasIdMap[post.area_id]
      const postAnalyticsData = {
        area_id: post.area_id,
        post_id: post.id,
        issue_id: post.issue_id,
      }
      return (
        <BottomContainer>
          {post.show_user_email && (
            <ButtonWrapper>
              <Button
                color={'#fff'}
                onPress={async () => {
                  analytics().logEvent('press_email_author', postAnalyticsData)

                  const subject = this.reTitle(post.title)

                  chooseMailApp({
                    title: 'Email author',
                    subject: subject,
                    toEmail: post.user_email,
                  })
                }}
                fullWidth
              >
                Email author
              </Button>
            </ButtonWrapper>
          )}

          {includeReplyButton && (
            <React.Fragment>
              {post.show_user_email && <ButtonSpacer />}
              <ButtonWrapper>
                <Button
                  color={'#fff'}
                  onPress={() => {
                    analytics().logEvent(
                      'press_reply_to_forum',
                      postAnalyticsData
                    )
                    this.handleReplyPress(post)
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
          <PostHeader selectable={true}>{post.title}</PostHeader>
          <PostAuthor selectable={true}>
            {postInfo}
            {showIssueData ? ' - ' : ''}
            {post.user_full_name}
            {post.user_full_name ? ' - ' : ''}
            {post.user_profile_name}
          </PostAuthor>
          {post.is_shared_post && (
            <PostShared>
              Shared from a neighboring FPF
              {fullAreasIdMap[post.area_id] && (
                <>
                  <Text> (</Text>
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
                  <Text>)</Text>
                </>
              )}
            </PostShared>
          )}
          <CategoryPosts>
            {categories
              .filter((category) => {
                return post.categories.includes(category.name)
              })
              .map((category) => {
                let categoryName = category.name
                return (
                  <TouchableOpacity
                    key={categoryName}
                    onPress={() => onTapCategory(category.id)}
                  >
                    <PostCategory labelStyle={category.label_style}>
                      {categoryName}
                    </PostCategory>
                  </TouchableOpacity>
                )
              })}
            {post.show_directory_recommendation_link && (
              <TouchableOpacity
                onPress={() =>
                  this.showDirectoryListing(post.referenced_profile)
                }
              >
                <PillPrimary>
                  <PillText>View Recommended Listing</PillText>
                </PillPrimary>
              </TouchableOpacity>
            )}
            {post.profile?.in_directory && (
              <TouchableOpacity
                onPress={() => this.showDirectoryListing(post.profile)}
              >
                <PillPrimary>
                  <PillText>View Directory Listing</PillText>
                </PillPrimary>
              </TouchableOpacity>
            )}
          </CategoryPosts>
          {Boolean(post.event.start_date) && (
            <PostDate>
              <TextSemibold>When:</TextSemibold> {post.event.display_date}
            </PostDate>
          )}
          {Boolean(post.event.address) && (
            <PostLocation>
              <TextSemibold>Where:</TextSemibold> {post.event.address}
            </PostLocation>
          )}
          {Boolean(post.event.url) && (
            <PostLocation>
              <TextSemibold>Join online:</TextSemibold>{' '}
              <PostUrl onPress={() => Linking.openURL(post.event.url)}>
                {post.event.url}
              </PostUrl>
            </PostLocation>
          )}
          <PostBody selectable={true}>
            <Autolink
              url
              email
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
  areasIdMap: PropTypes.object.isRequired,
  fullAreasIdMap: PropTypes.object.isRequired,
  postTruncateLength: PropTypes.number.isRequired,
  children: PropTypes.element,
  chooseMailApp: PropTypes.func.isRequired,
  includeBottomButtons: PropTypes.bool,
  hasBorder: PropTypes.bool,
  onTapCategory: PropTypes.func,
  showIssueData: PropTypes.bool,
  fetchSpecificIssue: PropTypes.func,
  moreText: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  categories: PropTypes.array,
}

Post.defaultProps = {
  onTapCategory: () => {},
  categories: [],
}
