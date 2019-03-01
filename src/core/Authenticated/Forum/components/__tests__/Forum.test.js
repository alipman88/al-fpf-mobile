import React from 'react'
import { ScrollView } from 'react-native'
import { shallow } from 'enzyme'
import { Forum } from '../Forum/Forum'
import { Post } from '../Post'
import { Advertisement } from '../Advertisement'

describe('Forum', () => {
  const defaultProps = {
    setupForumData: jest.fn(),
    navigation: {
      setParams: jest.fn()
    },
    setAccessToken: jest.fn(),
    currentIssueNum: 12,
    currentAreaId: 1,
    areas: [{ id: 1, name: 'Sparta' }],
    posts: {
      12: [
        {
          id: 1,
          content: 'Test test test testereeno',
          title: 'Test',
          categories: ['test'],
          user_first_name: 'test',
          user_last_name: 'test',
          user_profile_name: 'Mayor, Test Ontario'
        },
        {
          id: 2,
          content: 'Test test test testereeno',
          title: 'Test',
          categories: ['test'],
          user_first_name: 'test',
          user_last_name: 'test',
          user_profile_name: 'Mayor, Test Ontario'
        },
        {
          id: 3,
          content: 'Test test test testereeno',
          title: 'Test',
          categories: ['test'],
          user_first_name: 'test',
          user_last_name: 'test',
          user_profile_name: 'Mayor, Test Ontario'
        },
        {
          id: 4,
          content: 'Test test test testereeno',
          title: 'Test',
          categories: ['test'],
          user_first_name: 'test',
          user_last_name: 'test',
          user_profile_name: 'Mayor, Test Ontario'
        }
      ]
    },
    ads: {
      12: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        }
      ]
    }
  }

  afterEach(() => {
    defaultProps.setupForumData.mockReset()
    defaultProps.setAccessToken.mockReset()
  })

  test('calls setupForumData on mount', () => {
    shallow(<Forum {...defaultProps} />)

    expect(defaultProps.setupForumData).toHaveBeenCalled()
  })

  test('it renders some posts', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)

    expect(wrapper.find(Post).length).toEqual(4)
  })

  test('it sets the title as the current area name', () => {
    shallow(<Forum {...defaultProps} />)
    expect(defaultProps.navigation.setParams).toHaveBeenCalledWith({
      navTitle: 'Sparta'
    })
  })

  test('renders posts & ads in the right order', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    const children = wrapper.find(ScrollView).children()
    // start index at 2, skip the first two components
    for (let i = 2; i < children.length; i++) {
      const component = children.at(i)
      if (i === 4 || i === 6 || i === 8) {
        expect(component.is(Advertisement))
      } else {
        expect(component.is(Post))
      }
    }

    expect(children.length).toEqual(9)
  })

  test('one post, 3 ads, renders 1 & 1', () => {
    const posts = { 12: defaultProps.posts[12].slice(0, 1) }
    const wrapper = shallow(<Forum {...defaultProps} posts={posts} />)
    const children = wrapper.find(ScrollView).children()

    for (let i = 2; i < children.length; i++) {
      const component = children.at(i)
      if (i === 2) {
        expect(component.is(Post))
      } else {
        expect(component.is(Advertisement))
      }
    }

    expect(children.length).toEqual(4)
  })
})
