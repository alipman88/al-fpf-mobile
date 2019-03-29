import React from 'react'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import { GovernmentInfo } from '../GovernmentInfo'

describe('GovernmentInfo', () => {
  const defaultProps = {
    navigation: {},
    setNewUserByKey: jest.fn()
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
      title: 'Councillor'
    })
  })
})
