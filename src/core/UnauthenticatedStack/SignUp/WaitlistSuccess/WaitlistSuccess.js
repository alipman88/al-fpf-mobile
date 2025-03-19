import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StackActions } from '@react-navigation/native'

import { Modal } from '@fpf/components/Modal'

import {
  BodyText,
  Close,
  Container,
  TextContainer,
  Link,
} from './styledComponents'

export const WaitlistSuccess = ({ navigation, clearUserData }) => (
  <Modal dark>
    <Container>
      <Close
        onPress={() => {
          navigation.dispatch(StackActions.replace('Login'))
        }}
      >
        <Icon size={18} name='close' color='#c5c5c5' />
      </Close>
      <TextContainer>
        <BodyText>Thanks for your interest in Front Porch Forum!</BodyText>
      </TextContainer>
      <TextContainer>
        <TouchableOpacity
          onPress={() => {
            clearUserData()
            navigation.dispatch(StackActions.replace('Login'))
          }}
        >
          <Link>Continue</Link>
        </TouchableOpacity>
      </TextContainer>
    </Container>
  </Modal>
)

WaitlistSuccess.propTypes = {
  navigation: PropTypes.object.isRequired,
  clearUserData: PropTypes.func.isRequired,
}
