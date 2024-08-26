import React from 'react'
import { shallow } from 'enzyme'
import { ProfileTypes } from '../ProfileTypes'
import { ProfileTypeButton } from '../ProfileTypeButton'
import { profileTypes } from '@common/types/profileTypes'
import { FullScreenWizard } from '@components/FullScreenWizard'

describe('ProfileTypes', () => {
  const defaultProps = {
    appSettingsLoaded: true,
    setNewUserByKey: jest.fn(),
    newUser: {},
    navigation: {
      navigate: jest.fn(),
    },
    getAppSettings: jest.fn().mockResolvedValue(),
    profilePlans: [
      { id: 1, plan_type: 'neighbor' },
      { id: 2, plan_type: 'business' },
      { id: 3, plan_type: 'nonprofit' },
      { id: 4, plan_type: 'government' },
      { id: 5, plan_type: 'candidate' },
    ],
  }

  afterEach(() => {
    defaultProps.navigation.navigate.mockReset()
  })

  test('it creates five profile options from which to choose', () => {
    const wrapper = shallow(<ProfileTypes {...defaultProps} />)
    expect(wrapper.find(ProfileTypeButton).length).toBe(5)
  })

  test('it sets no profiles as active by default', () => {
    const wrapper = shallow(<ProfileTypes {...defaultProps} />)
    const actives = wrapper
      .state()
      .profileOptions.map((profile) => profile.active)
    expect(actives.includes(true)).toBe(false)
  })

  test('it sets profile to active on tap', () => {
    const wrapper = shallow(<ProfileTypes {...defaultProps} />)

    wrapper.instance().onTapProfileButton('neighbor')
    expect(defaultProps.setNewUserByKey).toHaveBeenCalledWith({
      profilePlan: {
        id: 1,
        plan_type: 'neighbor',
      },
    })

    expect(wrapper.state().profileOptions[0].active).toBe(true)
    expect(wrapper.state().profileOptions[1].active).toBe(false)
    expect(wrapper.state().profileOptions[2].active).toBe(false)
    expect(wrapper.state().profileOptions[3].active).toBe(false)
    expect(wrapper.state().profileOptions[4].active).toBe(false)
  })

  test('selecing neighbor navigates the user to the BasicInfo screen', () => {
    const wrapper = shallow(
      <ProfileTypes
        {...defaultProps}
        newUser={{ profileType: profileTypes.NEIGHBOR }}
      />,
    )
    wrapper.find(FullScreenWizard).props().onNextPress()
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('BasicInfo')
  })

  test('selecing business navigates the user to the BasicInfo screen', () => {
    const wrapper = shallow(
      <ProfileTypes
        {...defaultProps}
        newUser={{ profileType: profileTypes.BUSINESS }}
      />,
    )
    wrapper.find(FullScreenWizard).props().onNextPress()
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('BasicInfo')
  })

  test('selecing nonprofit navigates the user to the BasicInfo screen', () => {
    const wrapper = shallow(
      <ProfileTypes
        {...defaultProps}
        newUser={{ profileType: profileTypes.NONPROFIT }}
      />,
    )
    wrapper.find(FullScreenWizard).props().onNextPress()
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('BasicInfo')
  })

  test('selecing government navigates the user to the BasicInfo screen', () => {
    const wrapper = shallow(
      <ProfileTypes
        {...defaultProps}
        newUser={{ profileType: profileTypes.GOVERNMENT }}
      />,
    )
    wrapper.find(FullScreenWizard).props().onNextPress()
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('BasicInfo')
  })

  test('selecing candidate navigates the user to the BasicInfo screen', () => {
    const wrapper = shallow(
      <ProfileTypes
        {...defaultProps}
        newUser={{ profileType: profileTypes.CANDIDATE }}
      />,
    )
    wrapper.find(FullScreenWizard).props().onNextPress()
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('BasicInfo')
  })
})
