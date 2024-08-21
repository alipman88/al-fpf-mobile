import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

/**
 * Uses an Image component to render a remote image 'as is' in its original size
 */
export function SizedImage({ uri, maxHeight, maxWidth }) {
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        const maxHeight_ = maxHeight || height
        const maxWidth_ = maxWidth || width

        let h = height
        let w = width

        if (height > maxHeight_ || width > maxWidth_) {
          if (maxHeight_ / height < maxWidth_ / width) {
            w = (width * maxHeight_) / height
            h = maxHeight_
          } else {
            h = (height * maxWidth_) / width
            w = maxWidth_
          }
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
