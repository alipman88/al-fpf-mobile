import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

/**
 * Uses an Image component to render a remote image 'as is' in its original size
 */
export function SizedImage({ uri, maxHeight, maxWidth }) {
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()

  if (!maxHeight) maxHeight = height
  if (!maxWidth) maxWidth = width

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        let h = height
        let w = width

        if (maxHeight / height < maxWidth / width && h > maxHeight) {
          w = (width * maxHeight) / h
          h = maxHeight
        } else if (w > maxWidth) {
          h = (height * maxWidth) / w
          w = maxWidth
        }

        setWidth(w)
        setHeight(h)
      })
    }
  }, [uri, maxHeight, maxWidth])

  if (width && height) {
    return (
      <Image
        source={{ uri: uri }}
        testID='image'
        style={{
          backgroundColor: 'white', // in case of transparent PNG
          height: height,
          width: width,
        }}
      />
    )
  }

  return null
}

SizedImage.propTypes = {
  uri: PropTypes.string,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
}
