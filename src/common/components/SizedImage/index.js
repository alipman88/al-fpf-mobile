/**
 * Uses an Image component to render a remote image 'as is' in its original size
 */
import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-native'

export class SizedImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    if (this.props.uri) {
      Image.getSize(this.props.uri, (width, height) => {
        let h = height
        let w = width

        // scale to aspect ratio if height exceeds 100px
        const maxHeight = this.props.maxHeight
        if (maxHeight && h > maxHeight) {
          w = (width * maxHeight) / h
          h = maxHeight
        }

        this.setState({
          width: w,
          height: h,
        })
      })
    }
  }

  render() {
    if (this.state.width && this.state.height) {
      return (
        <Image
          source={{ uri: this.props.uri }}
          style={{
            height: this.state.height,
            width: this.state.width,
            marginRight: 6,
            marginBottom: 6,
          }}
        />
      )
    }

    return null
  }
}

SizedImage.propTypes = {
  uri: PropTypes.string,
  maxHeight: PropTypes.number,
}
