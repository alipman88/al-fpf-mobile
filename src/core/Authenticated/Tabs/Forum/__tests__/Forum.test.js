import React from 'react'
import messaging from '@react-native-firebase/messaging'
import { shallow } from 'enzyme'
import { waitFor } from '@testing-library/react-native'

import { Forum } from '../Forum'

jest.mock('@react-navigation/native', () => ({
  useScrollToTop: jest.fn(),
}))

describe('Forum', () => {
  const defaultProps = {
    accessToken: 'abc',
    setupForumData: jest.fn(),
    navigation: {
      navigate: jest.fn(),
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
    // defaultProps.setupForumData.mockReset()
    defaultProps.sendNewFCMToken.mockReset()
    // defaultProps.getIssues.mockReset()
    // defaultProps.getContents.mockReset()
    // defaultProps.setCurrentIssueId.mockReset()
    // defaultProps.setCurrentAreaId.mockReset()
    defaultProps.navigation.setParams.mockReset()
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

  describe('handleNotificationOpen', () => {
    test('calls to fetch for the issue from the notificationOpen event', () => {
      const wrapper = shallow(<Forum {...defaultProps} />)
      const payload = { area_id: '5', issue_id: '6', issue_number: '340' }
      wrapper.instance().handleNotificationOpen({
        data: {
          payload: JSON.stringify(payload),
        },
      })

      expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Forum', {
        sourceUrl: '/5/forum/archive/340',
      })
    })
  })
})
