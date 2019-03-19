import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'

import { ScreenContainer } from '@components/ScreenContainer'
import { createResetStackTo } from '@common/utils/navigation'

export const SettingsIndex = ({ resetAction, navigation }) => (
  <ScreenContainer grey>
    <TouchableOpacity
      onPress={() => {
        resetAction()
        navigation.navigate('SplashScreen')
        navigation.dispatch(createResetStackTo('Login'))
      }}
    >
      <Text>Logout</Text>
    </TouchableOpacity>
  </ScreenContainer>
)

SettingsIndex.navigationOptions = {
  title: 'Settings'
}

SettingsIndex.propTypes = {
  navigation: PropTypes.object.isRequired,
  resetAction: PropTypes.func.isRequired
}
