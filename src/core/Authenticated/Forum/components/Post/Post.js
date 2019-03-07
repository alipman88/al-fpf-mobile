import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { TouchableOpacity, Linking } from 'react-native'
import {
  Category,
  CategoryContainer,
  Card,
  Name,
  PostButton,
  TextButton
} from './styledComponents'

import { CardContent, ContentText, Header, Bottom } from '../sharedStyles'

export class Post extends React.Component {
  state = {
    showMore: false
  }

  toggleShowMore() {
    this.setState({ showMore: !this.state.showMore })
  }

  formatContent(content) {
    if (content.length > this.props.postTruncateLength) {
      return this.state.showMore
        ? content
        : `${content.substring(0, this.props.postTruncateLength)}...`
    }
    return content
  }

  render() {
    const {
      id,
      content,
      title,
      categories,
      user_first_name: firstName,
      user_last_name: lastName,
      user_email: email,
      user_profile_name: userDetails
    } = this.props.post

    const { onReplyPress, postTruncateLength } = this.props

    return (
      <Card>
        <CardContent>
          <Header>{title}</Header>
          <Name>{`${firstName} ${lastName}`}</Name>
          <Text>{userDetails}</Text>
          <ContentText ellipsizeMode='tail' numberOfLines={15}>
            {this.formatContent(content)}
          </ContentText>

          {content.length > postTruncateLength && (
            <TouchableOpacity onPress={() => this.toggleShowMore()}>
              <TextButton>
                Show {this.state.showMore ? 'less' : 'more'}
              </TextButton>
            </TouchableOpacity>
          )}

          {categories.map(category => (
            <CategoryContainer key={category}>
              <Category>{category}</Category>
            </CategoryContainer>
          ))}
        </CardContent>
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
              onPress={() => onReplyPress({ parentPostId: id, subject: title })}
            >
              Reply to forum
            </Button>
          </PostButton>
        </Bottom>
      </Card>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onReplyPress: PropTypes.func.isRequired,
  postTruncateLength: PropTypes.number.isRequired,
  key: PropTypes.number
}
