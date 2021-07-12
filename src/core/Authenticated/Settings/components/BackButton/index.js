import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { BackButtonContainer } from './styledComponents'

export const BackButton = ({ navigation, onPress }) => (
  <BackButtonContainer onPress={onPress || (() => navigation.goBack())}>
    <Icon name='keyboard-arrow-left' color='#355768' size={26} />
  </BackButtonContainer>
)

BackButton.propTypes = {
  navigation: PropTypes.object,
  onPress: PropTypes.func,
}
