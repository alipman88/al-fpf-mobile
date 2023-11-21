import React from 'react'
import TestRenderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react-native'
import { Image } from 'react-native'

import { SizedImage } from '../index'

describe('SizedImage', () => {
  /* eslint-disable prettier/prettier */
  const sizes = [
    // No max values set
    {
      name: 'No max sizes',
      width: 200, height: 100, expectedWidth: 200, expectedHeight: 100
    },

    // Max width set
    {
      name: 'Landscape larger than max width',
      width: 200, height: 100, maxWidth: 50, expectedWidth: 50, expectedHeight: 25
    },
    {
      name: 'Portrait larger than max width',
      width: 100, height: 200, maxWidth: 50, expectedWidth: 50, expectedHeight: 100
    },

    // Max height set
    {
      name: 'Landscape larger than max height',
      width: 200, height: 100, maxHeight: 50, expectedWidth: 100, expectedHeight: 50
    },
    {
      name: 'Portrait larger than max height',
      width: 100, height: 200, maxHeight: 50, expectedWidth: 25, expectedHeight: 50
    },

    // Max width and height set
    {
      name: 'Smaller than max sizes',
      width: 200, height: 100, maxWidth: 300, maxHeight: 300, expectedWidth: 200, expectedHeight: 100
    },
    {
      name: 'Landscape larger than max width and but not height',
      width: 200, height: 100, maxWidth: 50, maxHeight: 500, expectedWidth: 50, expectedHeight: 25
    },
    {
      name: 'Portrait larger than max width and but not height',
      width: 100, height: 200, maxWidth: 50, maxHeight: 500, expectedWidth: 50, expectedHeight: 100
    },
    {
      name: 'Landscape larger than max height and but not width',
      width: 200, height: 100, maxWidth: 500, maxHeight: 50, expectedWidth: 100, expectedHeight: 50
    },
    {
      name: 'Portrait larger than max height and but not width',
      width: 100, height: 200, maxWidth: 500, maxHeight: 50, expectedWidth: 25, expectedHeight: 50
    },
    {
      name: 'Landscape larger than max width and height',
      width: 200, height: 100, maxWidth: 50, maxHeight: 50, expectedWidth: 50, expectedHeight: 25
    },
    {
      name: 'Portrait larger than max width and height',
      width: 100, height: 200, maxWidth: 50, maxHeight: 50, expectedWidth: 25, expectedHeight: 50
    },
  ]
  /* eslint-enable prettier/prettier */

  sizes.forEach((size) => {
    test(`renders image at width and height when uri is present: ${size.name}`, () => {
      const imageUrl = 'someimage somewhere'
      const props = {
        uri: imageUrl,
        maxHeight: size.maxHeight,
        maxWidth: size.maxWidth,
      }

      // mock out the getSize call
      const getSizeMock = jest.spyOn(Image, 'getSize')
      getSizeMock.mockImplementation(() => {})

      render(<SizedImage {...props} />)

      const args = getSizeMock.mock.calls[0]
      expect(args[0]).toEqual(imageUrl)

      // second argument is the success callback that we need to invoke
      const successCallback = args[1]
      TestRenderer.act(() => {
        successCallback(size.width, size.height)
      })
      getSizeMock.mockRestore()

      const image = screen.getByTestId('image')
      expect(image).toHaveStyle({ width: size.expectedWidth })
      expect(image).toHaveStyle({ height: size.expectedHeight })
    })
  })

  test('does not render image or set width and height when uri is missing', () => {
    const props = { source: {} }

    render(<SizedImage {...props} />)
    expect(screen.queryByRole('image')).not.toBeOnTheScreen()
  })
})
