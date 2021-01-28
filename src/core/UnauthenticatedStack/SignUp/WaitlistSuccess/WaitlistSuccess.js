import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Modal } from '@components/Modal'
import { createResetStackTo } from '@common/utils/navigation'

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
          navigation.dispatch(createResetStackTo('Login'))
        }}
      >
        <Icon size={18} name='close' color='#c5c5c5' />
      </Close>
      <TextContainer>
        <BodyText>
          Thank you! Your request to join our waitlist has been submitted, we
          hope to see you engaging with your community on FPF in the near
          future.
        </BodyText>
      </TextContainer>
      <TextContainer>
        <TouchableOpacity
          onPress={() => {
            clearUserData()
            navigation.dispatch(createResetStackTo('Login'))
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
