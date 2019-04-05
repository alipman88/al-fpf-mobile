import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'

export class KeyboardOpen extends React.Component {
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
    const { render } = this.props
    return render({ open: this.state.keyboardOpen })
  }
}

KeyboardOpen.propTypes = {
  render: PropTypes.func.isRequired
}
