import React from 'react'
import messaging from '@react-native-firebase/messaging'
import { shallow } from 'enzyme'
import { waitFor } from '@testing-library/react-native'

import { ForumContainer } from '../styledComponents'
import { ForumComponent as Forum } from '../Forum'
import { ForumPost } from '../components/ForumPost'
import { ForumMessage } from '../components/ForumMessage'
import { NeighboringContent } from '../components/NeighboringContent'
import { ExternalLink } from '@fpf/components/ExternalLink'

jest.mock('@react-navigation/native', () => ({
  useScrollToTop: jest.fn(),
}))

describe('Forum', () => {
  const defaultProps = {
    setupForumData: jest.fn(),
    navigation: {
      setParams: jest.fn(),
      setOptions: jest.fn(),
    },
    route: { params: {} },
    navigateWithToken: jest.fn(),
    fcmToken: '',
    sendNewFCMToken: jest.fn(),
    currentIssueId: 12,
    currentAreaId: 1,
    issues: [{ id: 11 }, { id: 12 }, { id: 13 }],
    areas: [
      { id: 1, name: 'Sparta' },
      { id: 2, name: 'Athena' },
    ],
    getIssues: jest.fn(),
    getContents: jest.fn(),
    getAds: jest.fn(),
    setCurrentIssueId: jest.fn(),
    setCurrentAreaId: jest.fn(),
    fetchSpecificIssue: jest.fn(),
    toggleIssueUnread: jest.fn(),
    posts: {
      12: [
        {
          id: 1,
          content: 'Test test test testereeno',
          title: 'Test',
          categories: ['test'],
          user_first_name: 'test',
          user_last_name: 'test',
          user_profile_name: 'Mayor, Test Ontario',
        },
        {
          id: 2,
          content: 'Test test test testereeno',
          title: 'Test',
          categories: ['test'],
          user_first_name: 'test',
          user_last_name: 'test',
          user_profile_name: 'Mayor, Test Ontario',
        },
        {
          id: 3,
          content: 'Test test test testereeno',
          title: 'Test',
          categories: ['test'],
          user_first_name: 'test',
          user_last_name: 'test',
          user_profile_name: 'Mayor, Test Ontario',
        },
        {
          id: 4,
          content: 'Test test test testereeno',
          title: 'Test',
          categories: ['test'],
          user_first_name: 'test',
          user_last_name: 'test',
          user_profile_name: 'Mayor, Test Ontario',
        },
      ],
    },
    neighboringAreas: {},
    ads: {
      12: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ],
    },
    featuredAdCampaigns: {},
    sharedPosts: {
      12: [],
    },
  }

  afterEach(() => {
    defaultProps.setupForumData.mockReset()
    defaultProps.sendNewFCMToken.mockReset()
    defaultProps.getIssues.mockReset()
    defaultProps.getContents.mockReset()
    defaultProps.setCurrentIssueId.mockReset()
    defaultProps.setCurrentAreaId.mockReset()
    defaultProps.navigation.setParams.mockReset()
  })

  test('calls setupForumData on mount', async () => {
    const wrapper = shallow(<Forum {...defaultProps} />)

    // called manually due to async logic in the code
    await wrapper.instance().componentDidMount()

    expect(defaultProps.setupForumData).toHaveBeenCalled()
  })

  test('calls sendNewFCMToken when firebase returns a different token', async () => {
    shallow(<Forum {...defaultProps} />)
    await waitFor(() =>
      expect(defaultProps.sendNewFCMToken).toHaveBeenCalledWith('fcmToken'),
    )
  })

  test('sets up notification listeners', async () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    await wrapper.instance().componentDidMount()
    expect(messaging().onTokenRefresh).toHaveBeenCalled()
    expect(messaging().onNotificationOpenedApp).toHaveBeenCalled()
  })

  test('user has not given messaging permission, should ask firebase for it', async () => {
    const spy = jest.spyOn(messaging(), 'hasPermission').mockReturnValue(false)

    const wrapper = shallow(<Forum {...defaultProps} />)
    await wrapper.instance().componentDidMount()
    expect(messaging().requestPermission).toHaveBeenCalled()

    spy.mockRestore()
  })

  test('it renders some posts', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)

    expect(wrapper.find(ForumPost).length).toEqual(4)
  })

  test('it renders neighboring content', () => {
    const wrapper = shallow(<Forum {...defaultProps} currentIssueId={11} />)
    expect(wrapper.find(NeighboringContent).length).toEqual(1)
  })

  test('doesnt render neighboring content if not latest issue', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    expect(wrapper.find(NeighboringContent).length).toEqual(0)
  })

  test('it renders forum message', () => {
    const wrapper = shallow(<Forum {...defaultProps} currentIssueId={11} />)
    expect(wrapper.find(ForumMessage).length).toEqual(1)
  })

  test('doesnt render forum message if not latest issue', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    expect(wrapper.find(ForumMessage).length).toEqual(0)
  })

  test('it sets the title as the current area name', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    expect(defaultProps.navigation.setOptions).toHaveBeenCalledWith({
      headerTitle: 'Sparta',
    })

    wrapper.setProps({ currentAreaId: 2 })
    expect(defaultProps.navigation.setOptions).toHaveBeenCalledWith({
      headerTitle: 'Athena',
    })
  })

  test('notifies user if no active profiles or enabled areas', () => {
    const wrapper = shallow(<Forum {...defaultProps} hasAreaAccess={false} />)
    const notification = wrapper.find(ExternalLink).props()['content']
    expect(notification).toContain(
      'You have no active profiles on your account',
    )
  })

  test('renders posts & ads in the right order', () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    const children = wrapper.find(ForumContainer).children()
    // start index at 1, skip the first component
    // skip the last one, due to being neighboring content
    for (let i = 1; i < children.length - 1; i++) {
      const component = children.at(i)
      if (i === 3 || i === 5 || i === 7) {
        expect(component.name()).toEqual('Advertisement')
      } else {
        expect(component.name()).toEqual('Connect(ForumPost)')
      }
    }

    expect(children.length).toEqual(8)
  })

  test('one post, 3 ads, renders 1 followed by 3 ads', () => {
    const posts = { 12: defaultProps.posts[12].slice(0, 1) }
    const wrapper = shallow(<Forum {...defaultProps} posts={posts} />)
    const children = wrapper.find(ForumContainer).children()

    expect(children.at(1).name()).toEqual('Connect(ForumPost)')
    expect(children.at(2).name()).toEqual('Advertisement')
    expect(children.at(3).name()).toEqual('Advertisement')
    expect(children.at(4).name()).toEqual('Advertisement')

    expect(children.length).toEqual(5)
  })

  test('shared posts integrate with the regular posts & ads', () => {
    const posts = { 12: defaultProps.posts[12].slice(0, 1) }
    const sharedPosts = {
      12: defaultProps.posts[12]
        .slice(1, 3)
        .map((post) => ({ ...post, is_shared_post: true })),
    }

    const wrapper = shallow(
      <Forum {...defaultProps} posts={posts} sharedPosts={sharedPosts} />,
    )

    const children = wrapper.find(ForumContainer).children()

    expect(children.at(1).name()).toEqual('Connect(ForumPost)')
    expect(children.at(2).name()).toEqual('Connect(ForumPost)')
    expect(children.at(3).name()).toEqual('Advertisement')
    expect(children.at(4).name()).toEqual('Connect(ForumPost)')
    expect(children.at(5).name()).toEqual('Advertisement')
    expect(children.at(6).name()).toEqual('Advertisement')

    expect(children.at(2).props().post.is_shared_post).toEqual(true)
    expect(children.at(4).props().post.is_shared_post).toEqual(true)

    expect(children.length).toEqual(7)
  })

  describe('componentDidUpdate', () => {
    test('areas changing loads issues', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({
        areas: [
          { id: 1, name: 'Sparta' },
          { id: 2, name: 'Athena' },
          { id: 3, name: '' },
        ],
      })

      expect(defaultProps.getIssues).toHaveBeenCalledWith(
        defaultProps.currentAreaId,
        defaultProps.navigation,
        defaultProps.setupForumData,
      )
    })

    test('changing area id pulls issues for that area', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({ currentAreaId: 2 })
      expect(defaultProps.getIssues).toHaveBeenCalledWith(
        2,
        defaultProps.navigation,
        defaultProps.setupForumData,
      )
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

    test('if currentIssueId changes, get posts', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({ currentIssueId: 45 })
      expect(defaultProps.getContents).toHaveBeenCalledWith(
        45,
        defaultProps.navigation,
      )
    })

    test('if there is an area id in navigation params, set currentArea', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          areaId: '30',
          issueId: '2121',
        },
        route: { params: { areaId: 30 } },
      })

      expect(defaultProps.setCurrentAreaId).toHaveBeenCalledWith(30)
      expect(defaultProps.navigation.setParams).toHaveBeenCalledWith({
        areaId: undefined,
      })
      expect(defaultProps.navigation.setParams).toHaveBeenCalledWith({
        issueNum: undefined,
      })
    })

    test('if there is an issue num in navigation params, find issue and set ID', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      const scrollTo = jest.fn()
      wrapper.instance().refs = {
        forumViewRef: {
          scrollTo: scrollTo,
        },
      }
      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          setParams: jest.fn(),
          areaId: '30',
          issueId: '2121',
        },
        route: { params: { areaId: 30 } },
      })

      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          setParams: jest.fn(),
          areaId: '30',
          issueId: '2121',
        },
        route: { params: { issueNum: 2121 } },
        issues: [{ id: 1000, number: 2121 }],
      })

      expect(defaultProps.setCurrentIssueId).toHaveBeenCalledWith(1000)
    })

    test("if nav param issue is same as current issue, don't update currentIssueId", () => {
      const wrapper = shallow(<Forum {...defaultProps} currentIssueId={1000} />)

      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          areaId: '30',
          issueId: '2121',
        },
        route: { params: { areaId: 30 } },
      })

      wrapper.setProps({
        navigation: {
          ...defaultProps.navigation,
          setParams: jest.fn(),
          areaId: '30',
          issueId: '2121',
        },
        route: { params: { issueNum: 2121 } },
        issues: [{ id: 1000, number: 2121 }],
      })

      // This is called on mount. Assert that it was only called on mount (once)
      expect(defaultProps.setCurrentIssueId).not.toHaveBeenCalled()
    })
  })

  describe('handleNotificationOpen', () => {
    test('calls to fetch for the issue from the notificationOpen event', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      const payload = { area_id: '5', issue_id: '6', issue_number: '340' }
      wrapper.instance().handleNotificationOpen({
        data: {
          payload: JSON.stringify(payload),
        },
      })

      expect(defaultProps.fetchSpecificIssue).toHaveBeenCalledWith(
        5,
        6,
        340,
        defaultProps.navigation,
        defaultProps.setupForumData,
      )
    })
  })
})
