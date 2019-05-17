import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import { shallow } from 'enzyme'

import { Post } from '@components/Post/Post'
import { PostCategory } from '@components/PostCategory'
import { Button } from '@components/Button'
import {
  PostDate,
  PostContainerBordered,
  ShowMoreButton
} from '../styledComponents'
import Autolink from 'react-native-autolink'
import { chooseMailApp } from '@common/utils/chooseMailApp'

jest.mock('@common/utils/chooseMailApp', () => ({
  chooseMailApp: jest.fn()
}))

describe('Post', () => {
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
      area_id: 2,
      categories: ['Lost and found'],
      content: 'This is a longer test that we should render'
    },
    hasBorder: false,
    moreText: 'Read',
    postTruncateLength: 200,
    onTapCategory: jest.fn(),
    includeBottomButtons: true,
    navigation: {
      navigate: jest.fn()
    },
    areasIdMap: {
      2: {
        id: 2
      }
    }
  }

  afterEach(() => {
    defaultProps.onTapCategory.mockReset()
  })

  test('renders post date', () => {
    const wrapper = shallow(<Post {...defaultProps} />)

    expect(wrapper.find(PostDate).length).toEqual(1)
  })

  test('it renders correct number of categories', () => {
    const props = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        categories: ['Lost and found', 'Seeking Advice']
      }
    }
    const wrapper = shallow(<Post {...props} />)
    expect(wrapper.find(PostCategory).length).toEqual(2)
  })

  test('can navigate to category search', () => {
    const wrapper = shallow(<Post {...defaultProps} />)
    wrapper.find(TouchableOpacity).simulate('press')
    expect(defaultProps.onTapCategory).toHaveBeenCalledWith('Lost and found')
  })

  test('show more button displays on long posts and works', () => {
    const post = {
      ...defaultProps.post,
      content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.`
    }

    const wrapper = shallow(
      <Post
        moreText={defaultProps.moreText}
        post={post}
        postTruncateLength={6}
      />
    )
    expect(wrapper.find(Autolink).props().text).toEqual('Lorem ...')

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

    expect(wrapper.find(Autolink).props().text).toEqual(post.content)

    expect(
      getButton(wrapper)
        .find(ShowMoreButton)
        .last()
        .text()
    ).toEqual('Read less')
  })

  test('it uses a boredered component if hasBorder is true', () => {
    const wrapper = shallow(<Post {...defaultProps} hasBorder />)

    expect(wrapper.find(PostContainerBordered).length).toBeTruthy()
  })

  test('reply button press', () => {
    const wrapper = shallow(<Post {...defaultProps} />)
    wrapper
      .find(Button)
      .last()
      .simulate('press')
    expect(firebase.analytics().logEvent).toHaveBeenCalledWith(
      'press_reply_to_forum',
      {
        area_id: defaultProps.post.area_id,
        post_id: defaultProps.post.id,
        issue_id: defaultProps.post.issue_id
      }
    )
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith({
      routeName: 'Compose',
      params: {
        parentPostId: defaultProps.post.id,
        areaId: defaultProps.post.area_id
      }
    })
  })

  test('email button press', () => {
    const wrapper = shallow(<Post {...defaultProps} />)
    wrapper
      .find(Button)
      .first()
      .simulate('press')
    expect(firebase.analytics().logEvent).toHaveBeenCalledWith(
      'press_email_author',
      {
        area_id: defaultProps.post.area_id,
        post_id: defaultProps.post.id,
        issue_id: defaultProps.post.issue_id
      }
    )
    expect(chooseMailApp).toHaveBeenCalledWith({
      subject: `RE: ${defaultProps.post.title}`,
      toEmail: defaultProps.post.user_email
    })
  })
})
