import React from 'react'
import PropTypes from 'prop-types'

import { Pill, CategoryText } from './styledComponents'

export class PostCategory extends React.Component {
  render() {
    const { children, labelStyle, labelStyles } = this.props

    let style = labelStyles[labelStyle] || {
      color: '#000000',
      background: '#ebecf1',
    }

    return (
      <Pill labelStyle={style}>
        <CategoryText labelStyle={style}>{children}</CategoryText>
      </Pill>
    )
  }
}

PostCategory.propTypes = {
  children: PropTypes.string.isRequired,
  labelStyle: PropTypes.string,
  labelStyles: PropTypes.object,
}

PostCategory.defaultProps = {
  labelStyle: 'light_grey',
  labelStyles: {},
}
