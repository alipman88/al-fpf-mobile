import React from 'react'
import { shallow } from 'enzyme'
import { Forum } from '../Forum'
import { Post } from '../posts/components/Post'

describe('Forum', () => {
  const defaultProps = {
    setupForumData: jest.fn(),
    navigation: {},
    setAccessToken: jest.fn(),
    currentIssueNum: 12,
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

    expect(wrapper.find(Post).length).toEqual(1)
  })
})
