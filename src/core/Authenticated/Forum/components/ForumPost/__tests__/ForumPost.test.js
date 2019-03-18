import React from 'react'
import { shallow } from 'enzyme'
import { Linking } from 'react-native'
import { Button } from '@components/Button'
import { ForumPost } from '../ForumPost'

describe('ForumPost', () => {
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
    moreText: 'Show',
    hasBorder: true,
    postTruncateLength: 100
  }

  afterEach(() => {
    defaultProps.onReplyPress.mockReset()
  })

  test('reply button press', () => {
    const wrapper = shallow(<ForumPost {...defaultProps} />)
    wrapper
      .find(Button)
      .last()
      .simulate('press')
    expect(defaultProps.onReplyPress).toHaveBeenCalledWith({
      parentPostId: defaultProps.post.id
    })
  })

  test('email button press', () => {
    const wrapper = shallow(<ForumPost {...defaultProps} />)
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
})
