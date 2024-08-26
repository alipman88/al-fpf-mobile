import React from 'react'
import { BasicInfoFields } from '../BasicInfoFields'
import { shallow } from 'enzyme'
import { TextInput } from '@components/TextInput'
import { FullScreenWizard } from '@components/FullScreenWizard'

describe('BasicInfoFields', () => {
  const defaultProps = {
    errors: {},
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    touched: {},
    profileType: 'neighbor',
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    newUser: {},
    stepCount: 4,
    navigation: {
      navigate: jest.fn(),
    },
    setNewUserByKey: jest.fn(),
  }

  afterEach(() => {
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
    defaultProps.setNewUserByKey.mockReset()
    defaultProps.navigation.navigate.mockReset()
  })

  test('changing an input setsValues, calls setFieldTouched', () => {
    const wrapper = shallow(<BasicInfoFields {...defaultProps} />)

    wrapper.find(TextInput).first().simulate('changeText', 'Bob')
    wrapper.find(TextInput).first().simulate('blur')

    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('firstName', 'Bob')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('firstName')
  })

  test('clicking Continue sets form data in store', () => {
    const userValues = {
      firstName: 'Bob',
      lastName: 'Ross',
      email: 'happy@little.tree',
      password: ' TreesCoverUpAMultitudeOfSins.',
      passwordConfirmation: ' TreesCoverUpAMultitudeOfSins.',
    }

    const wrapper = shallow(
      <BasicInfoFields
        {...defaultProps}
        values={userValues}
        touched={{ firstName: true }}
      />,
    )
    wrapper.find(FullScreenWizard).first().props().onNextPress()

    expect(defaultProps.setNewUserByKey).toHaveBeenCalledWith(userValues)
    expect(defaultProps.navigation.navigate).toHaveBeenCalled()
  })

  test('Continue button is disabled unless fields are full', () => {
    const wrapper = shallow(<BasicInfoFields {...defaultProps} />)
    expect(wrapper.find(FullScreenWizard).first().props().nextDisabled).toEqual(
      true,
    )
  })

  test('Continue button is disabled if there are errors', () => {
    const errors = {
      firstName: 'is a terrible name',
    }

    const wrapper = shallow(
      <BasicInfoFields {...defaultProps} errors={errors} />,
    )

    expect(wrapper.find(FullScreenWizard).first().props().nextDisabled).toEqual(
      true,
    )
  })

  test('it sets 4 or 5 steps depending on the profile', () => {
    const wrapper = (type) => {
      return shallow(<BasicInfoFields {...defaultProps} profileType={type} />)
        .find(FullScreenWizard)
        .first()
        .props().steps
    }

    expect(wrapper('neighbor')).toEqual(4)
    expect(wrapper('business')).toEqual(5)
    expect(wrapper('government')).toEqual(5)
    expect(wrapper('candidate')).toEqual(5)
  })
})
