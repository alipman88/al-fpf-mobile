import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

import { createResetStackTo } from '@common/utils/navigation'
import { ScreenContainer } from '@components/ScreenContainer'
import { Text } from '@components/Text'

export const Forum = ({ navigation, setAccessToken }) => (
  <ScreenContainer>
    <Text>Forum</Text>
    <TouchableOpacity
      onPress={() => {
        setAccessToken('')
        navigation.navigate('UnauthenticatedStack')
        navigation.dispatch(createResetStackTo('Login'))
      }}
    >
      <Text>Logout</Text>
    </TouchableOpacity>
  </ScreenContainer>
)

Forum.propTypes = {
  navigation: PropTypes.object.isRequired,
  setAccessToken: PropTypes.func.isRequired
}
