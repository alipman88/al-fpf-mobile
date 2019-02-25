import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import {
  Bottom,
  Category,
  CategoryContainer,
  Card,
  CardContent,
  ContentText,
  Header,
  Name,
  PostButton,
  VerticalDivider
} from './styledComponents'

export const Post = ({ post, onButtonPress }) => {
  const {
    content,
    title,
    categories,
    user_first_name: firstName,
    user_last_name: lastName,
    user_email: email,
    user_profile_name: userDetails
  } = post

  const categoryRender = categories.map(cat => (
    <Category key={cat}>{cat}</Category>
  ))
  return (
    <Card>
      <CardContent>
        <Header>{title}</Header>
        <Name>{`${firstName} ${lastName}`}</Name>
        <Text>{userDetails}</Text>
        <ContentText ellipsizeMode='tail' numberOfLines={15}>
          {content}
        </ContentText>
        <CategoryContainer>{categoryRender}</CategoryContainer>
      </CardContent>
      <Bottom>
        <PostButton>
          <Button color={'#fff'} onPress={() => onButtonPress('email', email)}>
            Email author
          </Button>
        </PostButton>

        <VerticalDivider />

        <PostButton>
          <Button color={'#fff'} onPress={() => onButtonPress('reply')}>
            Reply to forum
          </Button>
        </PostButton>
      </Bottom>
    </Card>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onButtonPress: PropTypes.func.isRequired
}
