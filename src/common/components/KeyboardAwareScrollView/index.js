import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView as Base } from 'react-native-keyboard-aware-scroll-view'

export const KeyboardAwareScrollView = ({ children, ...props }) => (
  <Base {...props} contentContainerStyle={{ flex: 1 }}>
    {children}
  </Base>
)

KeyboardAwareScrollView.propTypes = {
  children: PropTypes.node
}
