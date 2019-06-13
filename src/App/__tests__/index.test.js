import React from 'react'
import { shallow } from 'enzyme'

import { App } from '../index'
import { Offline } from '../Offline'

jest.mock('../Container.js', () => ({
  Container: () => null
}))

describe('App', () => {
  test('renders Offline screen when state is offline', () => {
    const wrapper = shallow(<App />)

    wrapper.setState({ connected: false })
    expect(wrapper.find(Offline).length).toEqual(1)
  })

  describe('setConnectedStatus', () => {
    test('sets connected state depending on variables', async () => {
      const wrapper = shallow(<App />)

      let result = await wrapper
        .instance()
        .setConnectedStatus({ type: 'none', effectiveType: '4g' })
      expect(result).toEqual(false)

      result = await wrapper
        .instance()
        .setConnectedStatus({ type: 'unknown', effectiveType: '4g' })
      expect(result).toEqual(false)

      result = await wrapper
        .instance()
        .setConnectedStatus({ type: 'cellular', effectiveType: '2g' })
      expect(result).toEqual(false)

      result = await wrapper
        .instance()
        .setConnectedStatus({ type: 'wifi', effectiveType: '2g' })
      expect(result).toEqual(true)

      result = await wrapper
        .instance()
        .setConnectedStatus({ type: 'cellular', effectiveType: '4g' })
      expect(result).toEqual(true)
    })

    test('when connection is unknown, it tries the backend server', async () => {
      const wrapper = shallow(<App />)
      global.fetch = jest.fn()

      await wrapper
        .instance()
        .setConnectedStatus({ type: 'unknown', effectiveType: 'unknown' })
      expect(wrapper.state().connected).toEqual(true)
    })
  })
})
