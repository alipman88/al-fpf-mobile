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
    test('sets connected state depending on variables', () => {
      const wrapper = shallow(<App />)
      expect(wrapper.state().connected).toEqual(true)

      wrapper.instance().setConnectedStatus('none', '4g')
      expect(wrapper.state().connected).toEqual(false)
      wrapper.instance().setConnectedStatus('unknown', '4g')
      expect(wrapper.state().connected).toEqual(false)

      wrapper.instance().setConnectedStatus('cellular', '2g')
      expect(wrapper.state().connected).toEqual(false)

      wrapper.instance().setConnectedStatus('wifi', '2g')
      expect(wrapper.state().connected).toEqual(true)

      wrapper.instance().setConnectedStatus('cellular', '4g')
      expect(wrapper.state().connected).toEqual(true)
    })
  })
})
