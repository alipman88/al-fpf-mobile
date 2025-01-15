import React from 'react'
import { shallow } from 'enzyme'
import { FullScreenWizard } from '@fpf/components/FullScreenWizard'
import { CreateAccount } from '../CreateAccount'
import { CheckboxField } from '../CheckboxField'

describe('CreateAccount', () => {
  const defaultProps = {
    newUser: {
      profileType: 'neighbor',
    },
    navigation: {
      navigate: jest.fn(),
    },
    postSignUp: jest.fn(() => {}),
    setNewUserByKey: jest.fn(),
    profileType: 'neighbor',
    loading: false,
  }

  afterEach(() => {
    defaultProps.setNewUserByKey.mockReset()
    defaultProps.postSignUp.mockReset()
    defaultProps.navigation.navigate.mockReset()
  })

  test('it has three options by default', () => {
    const wrapper = shallow(<CreateAccount {...defaultProps} />)

    expect(wrapper.instance().state.options.length).toEqual(3)
  })

  test('it adds options when business profiletype', () => {
    const wrapper = shallow(
      <CreateAccount {...defaultProps} profileType='business' />,
    )

    expect(wrapper.instance().state.options.length).toEqual(5)
  })

  test('it adds options when nonprofit profiletype', () => {
    const wrapper = shallow(
      <CreateAccount {...defaultProps} profileType='nonprofit' />,
    )

    expect(wrapper.instance().state.options.length).toEqual(5)
  })

  test('it creates the right number of Checkboxes for business profiletype', () => {
    const wrapper1 = shallow(<CreateAccount {...defaultProps} />)
    const wrapper2 = shallow(
      <CreateAccount {...defaultProps} profileType='business' />,
    )
    expect(wrapper1.find(CheckboxField).length).toEqual(3)
    expect(wrapper2.find(CheckboxField).length).toEqual(5)
  })

  test('it creates the right number of Checkboxes for nonprofit profiletype', () => {
    const wrapper1 = shallow(<CreateAccount {...defaultProps} />)
    const wrapper2 = shallow(
      <CreateAccount {...defaultProps} profileType='nonprofit' />,
    )
    expect(wrapper1.find(CheckboxField).length).toEqual(3)
    expect(wrapper2.find(CheckboxField).length).toEqual(5)
  })

  test('toggleCheckbox toggles values', () => {
    const wrapper = shallow(<CreateAccount {...defaultProps} />)

    wrapper.instance().toggleCheckbox('termsOfUse', true)
    expect(wrapper.instance().state.options[0].value).toEqual(true)

    wrapper.instance().toggleCheckbox('termsOfUse', false)
    expect(wrapper.instance().state.options[0].value).toEqual(false)
  })

  test('nextClick sets keys, posts data', async () => {
    const wrapper = shallow(<CreateAccount {...defaultProps} />)
    wrapper.instance().toggleCheckbox('termsOfUse', true)

    wrapper.find(FullScreenWizard).first().props().onNextPress()

    expect(defaultProps.setNewUserByKey).toHaveBeenCalledWith({
      termsOfUse: true,
      postIntro: true,
      isNfBooster: false,
    })
    await expect(defaultProps.postSignUp).toHaveBeenCalled()
  })
})
