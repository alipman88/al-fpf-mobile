import React from 'react'
import TestRenderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react-native'
import { Image } from 'react-native'

import { SizedImage } from '../index'

describe('SizedImage', () => {
  test('renders image at width and height when uri is present', () => {
    const image_url = 'someimage somewhere'
    const props = { uri: image_url, maxHeight: 50 }

    // mock out the getSize call
    const getSizeMock = jest.spyOn(Image, 'getSize')
    getSizeMock.mockImplementation(() => {})

    render(<SizedImage {...props} />)

    expect(getSizeMock).toHaveBeenCalledTimes(1)

    const args = getSizeMock.mock.calls[0]
    expect(args[0]).toEqual(image_url)

    // second argument is the success callback that we need to invoke
    const success_callback = args[1]
    TestRenderer.act(() => {
      success_callback(200, 100)
    })

    const image = screen.getByTestId('image')
    expect(image).toHaveStyle('width', 100)
    expect(image).toHaveStyle('height', 50)

    getSizeMock.mockRestore()
  })

  test('does not render image or set width and height when uri is missing', () => {
    const props = { source: {} }

    render(<SizedImage {...props} />)
    expect(screen.queryByRole('image')).not.toBeOnTheScreen()
  })
})
