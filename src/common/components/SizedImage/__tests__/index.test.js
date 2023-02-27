import React from 'react'
import { shallow } from 'enzyme'
import { Image } from 'react-native'
import { SizedImage } from '../index'

describe('SizedImage', () => {
  test('renders image at width and height when uri is present', () => {
    const image_url = 'someimage somewhere'
    const props = { uri: image_url, maxHeight: 50 }

    // mock out the getSize call
    const getSizeMock = jest.spyOn(Image, 'getSize')
    getSizeMock.mockImplementation(() => {})

    const wrapper = shallow(<SizedImage {...props} />)

    expect(getSizeMock).toHaveBeenCalledTimes(1)

    const args = getSizeMock.mock.calls[0]
    expect(args[0]).toEqual(image_url)

    // second argument is the success callback that we need to invoke
    const success_callback = args[1]
    success_callback(200, 100)

    // verify that the image was scaled to maximum height
    const state = wrapper.state()
    expect(state.width).toEqual(100)
    expect(state.height).toEqual(50)

    expect(wrapper.find(Image).length).toEqual(1)

    getSizeMock.mockRestore()
  })

  test('does not render image or set width and height when uri is missing', () => {
    const props = { source: {} }

    const wrapper = shallow(<SizedImage {...props} />)

    const state = wrapper.state()
    expect(state.width).toBeFalsy()
    expect(state.height).toBeFalsy()
    expect(wrapper.find(Image).length).toEqual(0)
  })
})
