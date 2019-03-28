import React from 'react'
import { shallow } from 'enzyme'

import { Address } from '../Address'

describe('Address', () => {
  const defaultProps = {
    navigation: {
      navigate: jest.fn()
    },
    newUser: {},
    searchAddress: jest.fn(),
    setNewUserByKey: jest.fn()
  }

  afterEach(() => {
    defaultProps.navigation.navigate.mockReset()
    defaultProps.searchAddress.mockReset()
    defaultProps.setNewUserByKey.mockReset()
  })

  describe('onSubmit', () => {
    test('requests data and updates state', async () => {
      const wrapper = shallow(<Address {...defaultProps} />)
      const setSubmitting = jest.fn()
      await wrapper
        .instance()
        .onSubmit({ streetName: 'Main' }, { setSubmitting })

      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(defaultProps.searchAddress).toHaveBeenCalledWith(
        { streetName: 'Main' },
        expect.any(Function)
      )

      const callback = defaultProps.searchAddress.mock.calls[0][1]
      callback([{ id: 1 }], { lat: '1', lng: '-1' })

      expect(wrapper.state()).toEqual({
        submitted: false
      })

      expect(defaultProps.setNewUserByKey).toHaveBeenCalledWith({
        streetName: 'Main'
      })

      expect(defaultProps.navigation.navigate).toHaveBeenCalledWith(
        'MapScreen',
        { areas: [{ id: 1 }], address: { lat: '1', lng: '-1' } }
      )

      expect(setSubmitting).toHaveBeenCalledWith(false)
    })

    test('already submitted and no areas, go to waitlist', async () => {
      const wrapper = shallow(<Address {...defaultProps} />)
      wrapper.setState({ submitted: true })
      const setSubmitting = jest.fn()
      await wrapper
        .instance()
        .onSubmit({ streetName: 'Main' }, { setSubmitting })

      expect(defaultProps.searchAddress).toHaveBeenCalledWith(
        { streetName: 'Main' },
        expect.any(Function)
      )

      const callback = defaultProps.searchAddress.mock.calls[0][1]
      callback([], {})

      expect(wrapper.state()).toEqual({
        submitted: true
      })

      expect(defaultProps.setNewUserByKey).toHaveBeenCalled()
      expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Waitlist')

      expect(setSubmitting).toHaveBeenCalledWith(false)
    })

    test('no areas found, set state to submitted', async () => {
      const wrapper = shallow(<Address {...defaultProps} />)
      const setSubmitting = jest.fn()
      await wrapper
        .instance()
        .onSubmit({ streetName: 'Main' }, { setSubmitting })

      expect(defaultProps.searchAddress).toHaveBeenCalledWith(
        { streetName: 'Main' },
        expect.any(Function)
      )

      const callback = defaultProps.searchAddress.mock.calls[0][1]
      callback([], {})

      expect(wrapper.state()).toEqual({
        submitted: true
      })

      expect(defaultProps.setNewUserByKey).toHaveBeenCalled()
      expect(defaultProps.navigation.navigate).not.toHaveBeenCalled()

      expect(setSubmitting).toHaveBeenCalledWith(false)
    })
  })
})
