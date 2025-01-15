import React from 'react'
import { create } from 'react-test-renderer'
import { act } from 'react-dom/test-utils'
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { SizedImage } from '@fpf/components/SizedImage'

import { ImageSlider } from '../index'

describe('ImageSlider', () => {
  const defaultProps = {
    images: [
      {
        thumbnail_url: 'https://example.com/100/abc.jpg',
        large_url: 'https://example.com/1000/abc.jpg',
      },
      {
        thumbnail_url: 'https://example.com/100/def.jpg',
        large_url: 'https://example.com/1000/def.jpg',
      },
      {
        thumbnail_url: 'https://example.com/100/xyz.jpg',
        large_url: 'https://example.com/1000/xyz.jpg',
      },
    ],
  }

  const imageSlider = create(<ImageSlider {...defaultProps} />).root

  test('renders one thumbnail per image', () => {
    const flatList = imageSlider.findByType(FlatList)

    expect(flatList.props.data).toEqual(defaultProps.images)
    expect(flatList.findAllByType(TouchableOpacity).length).toEqual(3)
    expect(flatList.findAllByType(Image).length).toEqual(3)

    const thumbnails = flatList.findAllByType(Image)
    expect(thumbnails[0].props.source.uri).toEqual(
      'https://example.com/100/abc.jpg',
    )
    expect(thumbnails[1].props.source.uri).toEqual(
      'https://example.com/100/def.jpg',
    )
    expect(thumbnails[2].props.source.uri).toEqual(
      'https://example.com/100/xyz.jpg',
    )
  })

  test('opens and closes modal', () => {
    const flatList = imageSlider.findByType(FlatList)
    const thumbnail = flatList.findAllByType(TouchableOpacity)[1]
    const modal = imageSlider.findByType(Modal)

    // modal should initially be hidden
    expect(modal.props.visible).toEqual(false)

    // simulate tap on thumbnail
    act(() => {
      thumbnail.props.onPress()
    })

    // modal should now be visible, and contain full-size variant of selected thumbnail
    expect(modal.props.visible).toEqual(true)
    const sizedImage = modal.findByType(SizedImage)
    expect(sizedImage.props.uri).toEqual('https://example.com/1000/def.jpg')

    // dismiss modal by tapping anywhere
    const modalPressable = modal.findByType(Pressable)
    act(() => {
      modalPressable.props.onPress()
    })

    // modal should now be hidden
    expect(modal.props.visible).toEqual(false)
  })
})
