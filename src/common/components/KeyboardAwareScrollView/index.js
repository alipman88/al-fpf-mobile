import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'
import { KeyboardAwareScrollView as Base } from 'react-native-keyboard-aware-scroll-view'

export class KeyboardAwareScrollView extends React.Component {
  state = {
    keyboardOpen: false
  }

  componentDidMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this)
    )
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this)
    )
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove()
    this.keyboardDidHideSub.remove()
  }

  keyboardDidShow() {
    this.setState({
      keyboardOpen: true
    })
  }

  keyboardDidHide() {
    this.setState({
      keyboardOpen: false
    })
  }

  render() {
    const {
      children,
      contentContainerStyle,
      stretchToHeightOfScreen,
      ...otherProps
    } = this.props
    const style =
      stretchToHeightOfScreen && !this.state.keyboardOpen
        ? { flex: 1 }
        : undefined
    return (
      <Base
        enableOnAndroid
        keyboardShouldPersistTaps='handle'
        contentContainerStyle={{
          ...style,
          ...contentContainerStyle
        }}
        {...otherProps}
      >
        {children}
      </Base>
    )
  }
}

KeyboardAwareScrollView.propTypes = {
  children: PropTypes.node,
  contentContainerStyle: PropTypes.object,
  stretchToHeightOfScreen: PropTypes.bool
}
