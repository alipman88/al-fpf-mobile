import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

/**
 * Uses an Image component to render a remote image 'as is' in its original size
 */
export function SizedImage({ uri, maxHeight }) {
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        let h = height
        let w = width

        // scale to aspect ratio if height exceeds 100px
        if (maxHeight && h > maxHeight) {
          w = (width * maxHeight) / h
          h = maxHeight
        }

        setWidth(w)
        setHeight(h)
      })
    }
  }, [uri, maxHeight])

  if (width && height) {
    return (
      <Image
        source={{ uri: uri }}
        testID='image'
        style={{
          height: height,
          width: width,
          marginRight: 6,
          marginBottom: 6,
        }}
      />
    )
  }

  return null
}

SizedImage.propTypes = {
  uri: PropTypes.string,
  maxHeight: PropTypes.number,
}
