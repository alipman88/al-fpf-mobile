import React from 'react'
import { shallow } from 'enzyme'

import { Waitlist } from '../Waitlist'
import { createResetStackTo } from '@common/utils/navigation'

describe('Waitlist', () => {
  const defaultProps = {
    navigation: {
      dispatch: jest.fn(),
    },
    newUser: {
      user: { profilePlan: { id: 1, plan_type: 'neighbor' } },
    },
    setNewUserByKey: jest.fn(),
    joinWaitlist: jest.fn(),
  }

  afterEach(() => {
    defaultProps.navigation.dispatch.mockReset()
    defaultProps.setNewUserByKey.mockReset()
  })

  describe('onSubmit', () => {
    test('send data and updates state', async () => {
      const wrapper = shallow(<Waitlist {...defaultProps} />)
      const setSubmitting = jest.fn()
      await wrapper.instance().onSubmit({ bar: 'foo' }, { setSubmitting })

      expect(setSubmitting).toHaveBeenCalledWith(true)

      expect(wrapper.state()).toEqual({
        submitted: false,
      })

      expect(defaultProps.joinWaitlist).toHaveBeenCalled()

      expect(defaultProps.setNewUserByKey).toHaveBeenCalledWith({ bar: 'foo' })

      expect(defaultProps.navigation.dispatch).toHaveBeenCalledWith(
        createResetStackTo('WaitlistSuccess')
      )

      expect(setSubmitting).toHaveBeenCalledWith(false)
    })
  })
})
