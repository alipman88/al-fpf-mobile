import React from 'react'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import { GovernmentInfo } from '../GovernmentInfo'

describe('GovernmentInfo', () => {
  const defaultProps = {
    navigation: {
      navigate: jest.fn()
    },
    setNewUserByKey: jest.fn(),
    newUser: {
      government: {
        title: '',
        jurisdiction: '',
        tellUsMore: ''
      }
    },
    profileType: 'government'
  }

  afterEach(() => {
    defaultProps.setNewUserByKey.mockReset()
  })

  test('onSubmit sets the values into newUser', () => {
    const wrapper = shallow(<GovernmentInfo {...defaultProps} />)
    wrapper
      .find(Formik)
      .props()
      .onSubmit({ title: 'Councillor' })
    expect(defaultProps.setNewUserByKey).toHaveBeenCalledWith({
      government: { title: 'Councillor' }
    })
  })
})
