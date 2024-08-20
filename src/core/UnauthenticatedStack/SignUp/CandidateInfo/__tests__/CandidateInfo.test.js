import React from 'react'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import { CandidateInfo } from '../CandidateInfo'

describe('CandidateInfo', () => {
  const defaultProps = {
    navigation: {
      navigate: jest.fn(),
    },
    setNewUserByKey: jest.fn(),
    newUser: {
      candidate: {
        name: 'Someone for Mayor',
        title: 'Mayor',
        jurisdiction: 'Somewhere',
      },
    },
    profileType: 'candidate',
  }

  afterEach(() => {
    defaultProps.setNewUserByKey.mockReset()
  })

  test('onSubmit sets the values into newUser', () => {
    const wrapper = shallow(<CandidateInfo {...defaultProps} />)
    wrapper.find(Formik).props().onSubmit({ title: 'Councillor' })
    expect(defaultProps.setNewUserByKey).toHaveBeenCalledWith({
      candidate: { title: 'Councillor' },
    })
  })
})
