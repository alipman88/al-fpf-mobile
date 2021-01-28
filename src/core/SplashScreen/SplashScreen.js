import React from 'react'
import PropTypes from 'prop-types'

export class SplashScreen extends React.Component {
  componentDidMount() {
    if (this.props.accessToken) {
      this.props.navigation.navigate('Authenticated')
    } else {
      this.props.navigation.navigate('UnauthenticatedStack')
    }
  }

  render() {
    return null
  }
}

SplashScreen.propTypes = {
  accessToken: PropTypes.string.isRequired,
  navigation: PropTypes.object,
}
