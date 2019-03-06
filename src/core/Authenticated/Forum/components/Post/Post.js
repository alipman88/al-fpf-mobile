import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { TouchableOpacity } from 'react-native'
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
    console.log('showMore is: ')
    console.log(this.state.showMore)
  }

  formatContent(content) {
    if (content.length > this.props.postTruncateLength) {
      return this.state.showMore ? content : content.substring(0, this.props.postTruncateLength) + '...'
    }
    return content
  }

  render() {
    const { title, user_first_name, user_last_name, email, user_profile_name, content, categories } = this.props.post
    return (
      <Card>
        <CardContent>
          <Header>{title}</Header>
          <Name>{`${user_first_name} ${user_last_name}`}</Name>
          <Text>{user_profile_name}</Text>
          <ContentText ellipsizeMode='tail'>
            {this.formatContent(content)}
          </ContentText>
          { content.length > this.props.postTruncateLength &&
            <TouchableOpacity onPress={() => this.toggleShowMore()}>
              <TextButton>Show {this.state.showMore ? 'less' : 'more'}</TextButton>
            </TouchableOpacity>
          }
          {categories.map(category => (
            <CategoryContainer key={category}>
              <Category>{category}</Category>
            </CategoryContainer>
          ))}
        </CardContent>
        <Bottom>
          <PostButton>
            <Button color={'#fff'} onPress={() => this.props.onButtonPress('email', email)}>
              Email author
            </Button>
          </PostButton>
  
          <PostButton>
            <Button color={'#fff'} onPress={() => this.props.onButtonPress('reply')}>
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
  onButtonPress: PropTypes.func.isRequired,
  postTruncateLength: PropTypes.number,
  key: PropTypes.number
}
