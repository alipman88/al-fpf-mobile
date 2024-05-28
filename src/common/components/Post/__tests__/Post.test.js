import React from 'react'
import { TouchableOpacity } from 'react-native'
import { shallow } from 'enzyme'

import { Post } from '@components/Post/Post'
import { PostCategory } from '@components/PostCategory'
import { BadgeText } from '@components/Badge'
import { Button } from '@components/Button'
import {
  PostDate,
  PostContainerBordered,
  PostLink,
  PostLocation,
  ShowMoreButton,
} from '../styledComponents'
import { Disclaimer } from '@core/Authenticated/Tabs/Forum/components/sharedStyles'
import Autolink from 'react-native-autolink'

describe('Post', () => {
  const defaultProps = {
    post: {
      id: 1,
      title: 'abc',
      user_first_name: 'john',
      user_last_name: 'smith',
      user_email: 'test@example.com',
      user_profile_name: 'profile name',
      show_user_email: true,
      event: {
        start_date: new Date(),
      },
      area_id: 2,
      categories: ['Lost and found'],
      content: 'This is a longer test that we should render',
    },
    categories: [
      {
        id: 3,
        name: 'Lost and found',
        labelStyle: 'light_grey',
      },
      {
        name: 'Seeking Advice',
        labelStyle: 'dark_grey',
      },
    ],
    hasBorder: false,
    moreText: 'Read',
    postTruncateLength: 200,
    onTapCategory: jest.fn(),
    fetchSpecificIssue: jest.fn(),
    includeBottomButtons: true,
    navigation: {
      navigate: jest.fn(),
    },
    chooseMailApp: jest.fn(),
    areasIdMap: {
      2: {
        id: 2,
      },
    },
    fullAreasIdMap: {
      2: {
        id: 2,
      },
    },
  }

  afterEach(() => {
    defaultProps.chooseMailApp.mockReset()
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
        categories: ['Lost and found', 'Seeking Advice'],
      },
    }
    const wrapper = shallow(<Post {...props} />)
    expect(wrapper.find(PostCategory).length).toEqual(2)
  })

  test('can navigate to category search', () => {
    const wrapper = shallow(<Post {...defaultProps} />)
    wrapper.find(TouchableOpacity).simulate('press')
    expect(defaultProps.onTapCategory).toHaveBeenCalledWith(3)
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
          culpa qui officia deserunt mollit anim id est laborum.`,
    }

    const wrapper = shallow(
      <Post
        moreText={defaultProps.moreText}
        post={post}
        postTruncateLength={6}
        chooseMailApp={jest.fn()}
        navigation={{}}
        areasIdMap={{ 2: { id: 2 } }}
        fullAreasIdMap={{ 2: { id: 2 } }}
      />,
    )
    expect(wrapper.find(Autolink).props().text).toEqual('Lor...')

    const getButton = (wrapper) => {
      return wrapper.find(TouchableOpacity).last()
    }

    expect(getButton(wrapper).find(ShowMoreButton).last().text()).toEqual(
      'Read more',
    )

    getButton(wrapper).simulate('press')

    expect(wrapper.find(Autolink).props().text).toEqual(post.content)

    expect(getButton(wrapper).find(ShowMoreButton).last().text()).toEqual(
      'Read less',
    )
  })

  test('it uses a boredered component if hasBorder is true', () => {
    const wrapper = shallow(<Post {...defaultProps} hasBorder />)

    expect(wrapper.find(PostContainerBordered).length).toBeTruthy()
  })

  test('reply button press', () => {
    const wrapper = shallow(<Post {...defaultProps} />)
    wrapper.find(Button).last().simulate('press')
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Compose', {
      areaId: defaultProps.post.area_id,
      categoryId: null,
      parentPostId: defaultProps.post.id,
      referencedProfileId: null,
      title: `Re: ${defaultProps.post.title}`,
    })
  })

  test('email button press', () => {
    const wrapper = shallow(<Post {...defaultProps} />)
    wrapper.find(Button).first().simulate('press')
    expect(defaultProps.chooseMailApp).toHaveBeenCalledWith({
      subject: `Re: ${defaultProps.post.title}`,
      toEmail: defaultProps.post.user_email,
      title: 'Email Author',
    })
  })

  test('"See more postings" button press', () => {
    const post = { ...defaultProps.post, is_shared_post: true }
    const wrapper = shallow(<Post {...defaultProps} post={post} />)
    wrapper.find(PostLink).last().simulate('press')
    expect(defaultProps.fetchSpecificIssue).toHaveBeenCalledWith(
      defaultProps.post.area_id,
      defaultProps.post.issue_id,
      defaultProps.post.issue_number,
      defaultProps.navigation,
    )
  })

  test('Inaccessible shared post area does not have "See more postings" button', () => {
    const post = { ...defaultProps.post, area_id: 123, is_shared_post: true }
    const wrapper = shallow(<Post {...defaultProps} post={post} />)
    expect(wrapper.find(PostLink).length).toEqual(0)
  })

  test('Displays event address and URL', () => {
    const props = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        event: { address: '14 Decatur Street' },
      },
    }
    const wrapper = shallow(<Post {...props} />)
    expect(wrapper.find(PostLocation).text()).toEqual(
      'Where: 14 Decatur Street',
    )

    const props2 = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        event: { url: 'https://zoom.us/j/0123456789' },
      },
    }
    const wrapper2 = shallow(<Post {...props2} />)
    expect(wrapper2.find(PostLocation).text()).toEqual(
      'URL: https://zoom.us/j/0123456789',
    )

    const props3 = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        event: {
          address: '8 Main Street',
          url: 'https://zoom.us/j/0123456789',
        },
      },
    }
    const wrapper3 = shallow(<Post {...props3} />)
    expect(wrapper3.find(PostLocation).first().text()).toEqual(
      'Where: 8 Main Street',
    )
    expect(wrapper3.find(PostLocation).last().text()).toEqual(
      'URL: https://zoom.us/j/0123456789',
    )
  })

  test('renders closed badge', () => {
    const props = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        closed: true,
        event: {},
      },
    }
    const wrapper = shallow(<Post {...props} />)

    expect(wrapper.find(BadgeText).children().text()).toEqual(
      'Closed by Author',
    )
  })

  test('renders closed event badge', () => {
    const props = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        closed: true,
      },
    }
    const wrapper = shallow(<Post {...props} />)

    expect(wrapper.find(BadgeText).children().text()).toEqual('Canceled')
  })

  test('renders post disclaimer', () => {
    const props = {
      ...defaultProps,
      post: {
        ...defaultProps.post,
        disclaimer: { content_plain: 'foo', content_html: 'bar' },
      },
    }
    const wrapper = shallow(<Post {...props} />)

    expect(wrapper.find(Disclaimer).length).toEqual(1)
  })
})
