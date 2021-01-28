import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'
import { ProfileTypeButton } from '../ProfileTypeButton'

import { ProfileTypePill } from '../styledComponents'

describe('ProfileTypeButton', () => {
  const defaultProps = {
    onTapHandler: jest.fn(),
    buttonText: 'Business/Nonprofit',
    label: 'Business or nonprofit organization',
    type: 'business',
    active: false,
  }

  test('it shows a checkbox when active', () => {
    const wrapper = shallow(
      <ProfileTypeButton {...defaultProps} active={true} />
    )
    expect(wrapper.find(ProfileTypePill).first().props().image).toBeTruthy()
  })

  test('it fires the tap handler when tapped', () => {
    const wrapper = shallow(<ProfileTypeButton {...defaultProps} />)

    wrapper.find(TouchableOpacity).simulate('press')

    expect(defaultProps.onTapHandler).toHaveBeenCalledWith('business')
  })
})
