import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@components/Text'
import {
  Card,
  CardContent,
  ContentText,
  Header,
  Name,
  Category,
  Bottom
} from './styledComponents'

export const Post = ({ post }) => {
  const {
    content,
    title,
    categories,
    user_first_name: firstName,
    user_last_name: lastName,
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
        <Category>{categories}</Category>
      </CardContent>
      <Bottom />
    </Card>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}
