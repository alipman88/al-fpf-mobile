import React from 'react'
import { BusinessInfoFields } from '../BusinessInfoFields'
import { shallow } from 'enzyme'
import { TextInput } from '@components/TextInput'
import { FullScreenWizard } from '@components/FullScreenWizard'

describe('BusinessInfoFields', () => {
  const defaultProps = {
    errors: {},
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    touched: {},
    values: {
      name: '',
      businessCategoryId: [1],
      url: '',
      phone: '',
      description: ''
    },
    newUser: {},
    stepCount: 4,
    navigation: {
      navigate: jest.fn()
    },
    setNewUserByKey: jest.fn(),
    categories: [
      { id: 1, name: 'Animals', children: [{ id: 5, name: 'Pet Shop' }] },
      {
        id: 2,
        name: 'Community',
        children: [{ id: 9, name: 'Chamber of commerce' }]
      }
    ]
  }

  afterEach(() => {
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
    defaultProps.setNewUserByKey.mockReset()
    defaultProps.navigation.navigate.mockReset()
  })

  test('changing an input setsValues, calls setFieldTouched', () => {
    const wrapper = shallow(<BusinessInfoFields {...defaultProps} />)

    wrapper
      .find(TextInput)
      .first()
      .simulate('changeText', 'Legitimate Business')
    wrapper
      .find(TextInput)
      .first()
      .simulate('blur')

    expect(defaultProps.setFieldValue).toHaveBeenCalledWith(
      'name',
      'Legitimate Business'
    )
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('name')
  })

  test('clicking Continue sets form data in store', () => {
    const inputValues = {
      name: 'Something LTD.io',
      businessCategoryId: [1],
      url: 'http://made-it-up.work',
      phone: '',
      description: ''
    }

    const wrapper = shallow(
      <BusinessInfoFields {...defaultProps} values={inputValues} />
    )

    wrapper
      .find(FullScreenWizard)
      .first()
      .props()
      .onNextPress()

    expect(defaultProps.setNewUserByKey).toHaveBeenCalledWith({
      business: inputValues
    })
    expect(defaultProps.navigation.navigate).toHaveBeenCalled()
  })

  test('Continue button is disabled unless required fields are filled', () => {
    const wrapper = shallow(<BusinessInfoFields {...defaultProps} />)
    expect(
      wrapper
        .find(FullScreenWizard)
        .first()
        .props().nextDisabled
    ).toEqual(true)
  })

  test('Continue button is enabled if required fields are filled', () => {
    const values = {
      name: 'Something LTD.io',
      businessCategoryId: [9],
      url: '',
      phone: '',
      description: ''
    }

    const wrapper = shallow(
      <BusinessInfoFields {...defaultProps} values={values} />
    )
    expect(
      wrapper
        .find(FullScreenWizard)
        .first()
        .props().nextDisabled
    ).toEqual(false)
  })

  test('Continue button is disabled if there are errors', () => {
    const errors = {
      name: 'is arbitrarily erroring'
    }

    const wrapper = shallow(
      <BusinessInfoFields {...defaultProps} errors={errors} />
    )

    expect(
      wrapper
        .find(FullScreenWizard)
        .first()
        .props().nextDisabled
    ).toEqual(true)
  })
})
