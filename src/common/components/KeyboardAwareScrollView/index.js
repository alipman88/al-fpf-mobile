import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView as Base } from 'react-native-keyboard-aware-scroll-view'

import { KeyboardOpen } from '@components/KeyboardOpen'

export const KeyboardAwareScrollView = ({
  children,
  contentContainerStyle,
  stretchToHeightOfScreen,
  ...otherProps
}) => {
  return (
    <KeyboardOpen
      render={({ open }) => {
        const style = stretchToHeightOfScreen && !open ? { flex: 1 } : undefined
        return (
          <Base
            enableOnAndroid
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{
              ...style,
              ...contentContainerStyle
            }}
            {...otherProps}
          >
            {children}
          </Base>
        )
      }}
    />
  )
}

KeyboardAwareScrollView.propTypes = {
  children: PropTypes.node,
  contentContainerStyle: PropTypes.object,
  stretchToHeightOfScreen: PropTypes.bool
}
