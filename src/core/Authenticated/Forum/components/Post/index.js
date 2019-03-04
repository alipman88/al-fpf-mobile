import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import {
  Category,
  CategoryContainer,
  Card,
  Name,
  PostButton
} from './styledComponents'

import { CardContent, ContentText, Header, Bottom } from '../sharedStyles'

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

  return (
    <Card>
      <CardContent>
        <Header>{title}</Header>
        <Name>{`${firstName} ${lastName}`}</Name>
        <Text>{userDetails}</Text>
        <ContentText ellipsizeMode='tail' numberOfLines={15}>
          {content}
        </ContentText>
        {categories.map(category => (
          <CategoryContainer key={category}>
            <Category>{category}</Category>
          </CategoryContainer>
        ))}
      </CardContent>
      <Bottom>
        <PostButton>
          <Button color={'#fff'} onPress={() => onButtonPress('email', email)}>
            Email author
          </Button>
        </PostButton>

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
