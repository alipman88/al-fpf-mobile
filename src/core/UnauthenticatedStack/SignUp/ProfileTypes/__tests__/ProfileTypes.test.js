import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'
import { profileTypes } from '@common/types/profileTypes'
import { ProfileTypes } from '../ProfileTypes'
import { ProfileTypeButton } from '../ProfileTypeButton'
import { ProfileTypeContainer } from '../styledComponents'

describe('ProfileTypes', () => {
  const defaultProps = {
    setNewUserByKey: jest.fn(),
    navigation: {}
  }

  test('it creates three profile options from which to choose', () => {
    const wrapper = shallow(<ProfileTypes {...defaultProps} />)
    expect(wrapper.find(ProfileTypeButton).length).toBe(3)
  })

  test('it sets no profiles as active by default', () => {
    const wrapper = shallow(<ProfileTypes {...defaultProps} />)
    const actives = wrapper
      .state()
      .profileOptions.map(profile => profile.active)
    expect(actives.includes(true)).toBe(false)
  })

  test('it sets profile to active on tap', () => {
    const wrapper = shallow(<ProfileTypes {...defaultProps} />)

    wrapper.instance().onTapProfileButton('neighbor')
    expect(defaultProps.setNewUserByKey).toHaveBeenCalledWith({
      profileType: 'neighbor'
    })

    expect(wrapper.state().profileOptions[0].active).toBe(true)
    expect(wrapper.state().profileOptions[1].active).toBe(false)
    expect(wrapper.state().profileOptions[2].active).toBe(false)
  })
})
