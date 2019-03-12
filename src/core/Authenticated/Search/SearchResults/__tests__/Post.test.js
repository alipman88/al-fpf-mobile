import React from 'react'
import { TouchableOpacity } from 'react-native'
import { shallow } from 'enzyme'

import { Post } from '../Post'
import { PostDate, PostBody, ShowMoreButton } from '../styledComponents'

describe('SearchResults - Post', () => {
  const defaultProps = {
    post: {
      id: 1,
      title: 'abc',
      user_first_name: 'john',
      user_last_name: 'smith',
      user_email: 'test@example.com',
      user_profile_name: 'profile name',
      event: {
        start_date: new Date()
      },
      categories: ['Lost and found'],
      content: 'This is a longer test that we should render'
    },
    postTruncateLength: 200
  }

  test('renders post date', () => {
    const wrapper = shallow(<Post {...defaultProps} />)

    expect(wrapper.find(PostDate).length).toEqual(1)
  })

  test('show more button displays on long posts and works', () => {
    const wrapper = shallow(<Post {...defaultProps} postTruncateLength={5} />)
    expect(wrapper.find(PostBody).text()).toEqual('This ...')

    const getButton = wrapper => {
      return wrapper.find(TouchableOpacity).last()
    }

    expect(
      getButton(wrapper)
        .find(ShowMoreButton)
        .last()
        .text()
    ).toEqual('Read more')

    getButton(wrapper).simulate('press')

    expect(
      wrapper
        .find(PostBody)
        .last()
        .text()
    ).toEqual(defaultProps.post.content)

    expect(
      getButton(wrapper)
        .find(ShowMoreButton)
        .last()
        .text()
    ).toEqual('Read less')
  })
})
