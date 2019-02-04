import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@components/Text'

export class SplashScreen extends React.Component {
  componentDidMount() {
    this.props.setAppError('Test')
  }

  render() {
    return <Text>hi</Text>
  }
}

SplashScreen.propTypes = {
  setAppError: PropTypes.func.isRequired
}
