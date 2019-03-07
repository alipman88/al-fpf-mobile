import React from 'react'
import { shallow } from 'enzyme'
import { Linking } from 'react-native'
import { Button } from '@components/Button'
import { Category, TextButton } from '../styledComponents'
import { ContentText } from '../../sharedStyles'
import { TouchableOpacity } from 'react-native'
import { Post } from '../Post'

describe('Forum', () => {
  const defaultProps = {
    onReplyPress: jest.fn(),
    post: {
      id: 1,
      content: 'Test test test testereeno',
      title: 'Test',
      categories: ['test'],
      user_first_name: 'test',
      user_last_name: 'test',
      user_email: 'test@testmail.test',
      user_profile_name: 'Mayor, Test Ontario'
    },
    postTruncateLength: 100
  }

  afterEach(() => {
    defaultProps.onReplyPress.mockReset()
  })

  test('it renders correct number of categories', () => {
    const props = {
      ...defaultProps,
      post: { ...defaultProps.post, categories: ['test', 'test1'] }
    }
    const wrapper = shallow(<Post {...props} />)
    expect(wrapper.find(Category).length).toEqual(2)
  })

  test('reply button press', () => {
    const wrapper = shallow(<Post {...defaultProps} />)
    wrapper
      .find(Button)
      .last()
      .simulate('press')
    expect(defaultProps.onReplyPress).toHaveBeenCalledWith({
      parentPostId: defaultProps.post.id,
      subject: defaultProps.post.title
    })
  })

  test('email button press', () => {
    const wrapper = shallow(<Post {...defaultProps} />)
    wrapper
      .find(Button)
      .first()
      .simulate('press')
    expect(Linking.openURL).toHaveBeenCalledWith(
      `mailto:${defaultProps.post.user_email}?subject=RE: ${
        defaultProps.post.title
      }`
    )
  })

  test('show more button displays on long posts and works', () => {
    const props = {
      ...defaultProps,
      postTruncateLength: 20
    }
    const wrapper = shallow(<Post {...props} />)
    expect(
      wrapper
        .find(ContentText)
        .last()
        .text()
    ).toEqual('Test test test teste...')

    const getButton = wrapper => {
      return wrapper.find(TouchableOpacity).last()
    }

    expect(
      getButton(wrapper)
        .find(TextButton)
        .last()
        .text()
    ).toEqual('Show more')

    getButton(wrapper).simulate('press')

    expect(
      wrapper
        .find(ContentText)
        .last()
        .text()
    ).toEqual(defaultProps.post.content)

    expect(
      getButton(wrapper)
        .find(TextButton)
        .last()
        .text()
    ).toEqual('Show less')
  })
})
