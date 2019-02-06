import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { ScreenContainer } from '@components/ScreenContainer'
import { Text } from '@components/Text'

export class SplashScreen extends React.Component {
  render() {
    return (
      <ScreenContainer>
        <Text>hi</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text>Login Screen</Text>
        </TouchableOpacity>
      </ScreenContainer>
    )
  }
}

SplashScreen.propTypes = {
  navigation: PropTypes.object
}
