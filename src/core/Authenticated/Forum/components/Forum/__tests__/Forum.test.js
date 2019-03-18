import React from 'react'
import { ForumContainer } from '../styledComponents'
import { shallow } from 'enzyme'
import { Forum } from '../Forum'
import { ForumPost } from '../../ForumPost'
import { Advertisement } from '../../Advertisement'
import { NeighboringContent } from '../../NeighboringContent'

describe('Forum', () => {
  const defaultProps = {
    setupForumData: jest.fn(),
    navigation: {
      setParams: jest.fn(),
      getParam: jest.fn()
    },
    setAccessToken: jest.fn(),
    currentIssueId: 12,
    currentAreaId: 1,
    issues: [{ id: 12 }, { id: 13 }],
    areas: [{ id: 1, name: 'Sparta' }, { id: 2, name: 'Athena' }],
    getIssues: jest.fn(),
    getPosts: jest.fn(),
    setCurrentIssueId: jest.fn(),
    setCurrentAreaId: jest.fn(),
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
    neighboringAreas: {},
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
    defaultProps.getIssues.mockReset()
    defaultProps.getPosts.mockReset()
    defaultProps.setCurrentIssueId.mockReset()
    defaultProps.setCurrentAreaId.mockReset()
  })

  test('calls setupForumData on mount', () => {
    shallow(<Forum {...defaultProps} />)

    expect(defaultProps.setupForumData).toHaveBeenCalled()
  })

  test('it renders some posts', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)

    expect(wrapper.find(ForumPost).length).toEqual(4)
  })

  test('it renders neighboring content', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    expect(wrapper.find(NeighboringContent).length).toEqual(1)
  })

  test('doesnt render neighboring content if not latest issue', () => {
    const wrapper = shallow(<Forum {...defaultProps} currentIssueId={13} />)
    expect(wrapper.find(NeighboringContent).length).toEqual(0)
  })

  test('it sets the title as the current area name', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    expect(defaultProps.navigation.setParams).toHaveBeenCalledWith({
      navTitle: 'Sparta'
    })

    wrapper.setProps({ currentAreaId: 2 })
    expect(defaultProps.navigation.setParams).toHaveBeenCalledWith({
      navTitle: 'Athena'
    })
  })

  test('renders posts & ads in the right order', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    const children = wrapper.find(ForumContainer).children()
    // start index at 1, skip the first component
    for (let i = 1; i < children.length; i++) {
      const component = children.at(i)
      if (i === 4 || i === 6 || i === 8) {
        expect(component.is(Advertisement))
      } else {
        expect(component.is(ForumPost))
      }
    }

    expect(children.length).toEqual(9)
  })

  test('one post, 3 ads, renders 1 & 1', () => {
    const posts = { 12: defaultProps.posts[12].slice(0, 1) }
    const wrapper = shallow(<Forum {...defaultProps} posts={posts} />)
    const children = wrapper.find(ForumContainer).children()

    for (let i = 1; i < children.length; i++) {
      const component = children.at(i)
      if (i === 2) {
        expect(component.is(ForumPost))
      } else {
        expect(component.is(Advertisement))
      }
    }

    expect(children.length).toEqual(4)
  })

  describe('componentDidUpdate', () => {
    test('areas changing loads issues', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({
        areas: [
          { id: 1, name: 'Sparta' },
          { id: 2, name: 'Athena' },
          { id: 3, name: '' }
        ]
      })

      expect(defaultProps.getIssues).toHaveBeenCalledWith(
        defaultProps.currentAreaId
      )
    })

    test('changing area id pulls issues for that area', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({ currentAreaId: 2 })
      expect(defaultProps.getIssues).toHaveBeenCalledWith(2)
    })

    test('if issues change, but no length, do not set new currentIssueId', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({ issues: [] })
      expect(defaultProps.setCurrentIssueId).not.toHaveBeenCalled()
    })

    test('if issues change, and id is in list, dont change', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({ issues: [{ id: 12 }] })
      expect(defaultProps.setCurrentIssueId).not.toHaveBeenCalled()
    })

    test('if issues change, and id is not in list, set current issue to first one', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({ issues: [{ id: 15 }, { id: 14 }] })
      expect(defaultProps.setCurrentIssueId).toHaveBeenCalledWith(15)
    })

    test('if currentIssueId changes, get posts', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({ currentIssueId: 45 })
      expect(defaultProps.getPosts).toHaveBeenCalledWith(45)
    })

    test('if there is an area id in navigation params, set currentArea', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          getParam: jest.fn(() => 30),
          areaId: '30',
          issueId: '2121'
        }
      })

      expect(defaultProps.setCurrentAreaId).toHaveBeenCalledWith(30)
    })

    test('if there is an issue num in navigation params, find issue and set ID', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          getParam: jest.fn(() => 30),
          areaId: '30',
          issueId: '2121'
        }
      })

      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          getParam: jest.fn(() => 2121),
          areaId: '30',
          issueId: '2121'
        },
        issues: [{ id: 1000, number: 2121 }]
      })

      expect(defaultProps.setCurrentIssueId).toHaveBeenCalledWith(1000)
    })

    test("if nav param issue  is same as current issue, don't update currentIssueId", () => {
      const wrapper = shallow(<Forum {...defaultProps} currentIssueId={1000} />)
      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          getParam: jest.fn(() => 30),
          areaId: '30',
          issueId: '2121'
        }
      })

      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          getParam: jest.fn(() => 2121),
          areaId: '30',
          issueId: '2121'
        },
        issues: [{ id: 1000, number: 2121 }]
      })

      expect(defaultProps.setCurrentIssueId).not.toHaveBeenCalled()
    })
  })
})
