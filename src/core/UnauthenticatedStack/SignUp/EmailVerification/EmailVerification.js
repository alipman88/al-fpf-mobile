import React from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import PropTypes from 'prop-types'

import Spinner from 'react-native-loading-spinner-overlay'
import { ScreenContainer } from '@components/ScreenContainer'
import { HeaderLogo } from '@components/HeaderLogo'
import {
  BottomContainer,
  BirdContainer,
  Bird,
  SuccessMessage,
  HelpMessage,
  MessageContainer,
  BoldTextLink,
  TextLink
} from './styledComponents'

import yellowBird from '@assets/images/onboarding/yellow-bird.png'
import greyBird from '@assets/images/onboarding/grey-bird.png'
import LetterBird from '@assets/images/bird-letterbox/envelope-bird.png'

export const EmailVerification = ({ email, navigation, resendEmail }) => {
  const handleOnPress = async () => {
    await resendEmail(email)
    navigation.navigate('Login')
  }

  const grassControls = (
    <BottomContainer>
      <BirdContainer>
        <Bird source={greyBird} />
        <Bird source={LetterBird} />
        <Bird source={yellowBird} />
      </BirdContainer>
    </BottomContainer>
  )
  return (
    <ScreenContainer grassBackground grassControls={grassControls}>
      <Spinner visible={false} />
      <HeaderLogo />
      <MessageContainer>
        <SuccessMessage>
          Success! Check your email. We've sent a confirmation email message to
          rooney@gmail.com.
        </SuccessMessage>
        <HelpMessage>
          To complete your registration, please click on the link in that email.
          Then log into your FPF account.
        </HelpMessage>
        <HelpMessage>
          Don't see the email message? It might take awhile. Please check your
          spam folder, too. Thank you for your patience.
        </HelpMessage>
        <HelpMessage>
          If you do not receive the confirmation email message, then please{' '}
          <TextLink
            onPress={() =>
              Linking.openURL('https://frontporchforum.com/contact')
            }
          >
            contact us
          </TextLink>{' '}
          contact us and we&apos;ll gladly help.
        </HelpMessage>
        <TouchableOpacity onPress={() => handleOnPress()}>
          <BoldTextLink>Resend Email Verification</BoldTextLink>
        </TouchableOpacity>
      </MessageContainer>
    </ScreenContainer>
  )
}

EmailVerification.propTypes = {
  navigation: PropTypes.object.isRequired,
  email: PropTypes.object.isRequired,
  resendEmail: PropTypes.func.isRequired
}
