import React from 'react'
import { TouchableOpacity, Linking, ScrollView } from 'react-native'
import Config from 'react-native-config'
import PropTypes from 'prop-types'

import Spinner from 'react-native-loading-spinner-overlay'
import { ScreenContainer } from '@components/ScreenContainer'
import { HeaderLogo } from '@components/HeaderLogo'
import { profileTypes } from '@common/types/profileTypes'
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

export class EmailVerification extends React.Component {
  componentDidMount() {
    const { setRegistrationEmail, newUser } = this.props
    setRegistrationEmail(newUser.email)
  }

  handleGoToLogin = () => {
    const { clearUserData, navigation } = this.props
    clearUserData()
    navigation.navigate('Login')
  }

  handleResend = async () => {
    const { resendEmail, email } = this.props
    await resendEmail(email)
  }

  render() {
    const { email, profileType } = this.props

    const grassContent = (
      <BottomContainer>
        <BirdContainer>
          <Bird source={greyBird} />
          <Bird source={LetterBird} />
          <Bird source={yellowBird} />
        </BirdContainer>
      </BottomContainer>
    )
    return (
      <ScreenContainer grassBackground grassContent={grassContent}>
        <Spinner visible={false} />
        <HeaderLogo />
        <ScrollView>
          <MessageContainer>
            {profileType === profileTypes.GOVERNMENT ? (
              <HelpMessage>
                Your government profile will be reviewed within 48hrs. Once
                approved, you will have access to your FPF(s). Please{' '}
                <TextLink
                  onPress={() =>
                    Linking.openURL(`${Config.WEBSITE_HOST}/contact`)
                  }
                >
                  contact us
                </TextLink>{' '}
                as needed.
              </HelpMessage>
            ) : (
              <>
                <SuccessMessage>
                  Success! Check your email. We've sent a confirmation email
                  message to {email}
                </SuccessMessage>
                <HelpMessage>
                  To complete your registration, please click on the link in
                  that email. Then log into your FPF account.
                </HelpMessage>
                <HelpMessage>
                  Don't see the email message? It might take awhile. Please
                  check your spam folder, too. Thank you for your patience.
                </HelpMessage>
                <HelpMessage>
                  If you do not receive the confirmation email message, then
                  please{' '}
                  <TextLink
                    onPress={() =>
                      Linking.openURL(`${Config.WEBSITE_HOST}/contact`)
                    }
                  >
                    contact us
                  </TextLink>{' '}
                  and we&apos;ll gladly help.
                </HelpMessage>
              </>
            )}

            <TouchableOpacity onPress={() => this.handleResend()}>
              <BoldTextLink>Resend Email Verification</BoldTextLink>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.handleGoToLogin()}>
              <BoldTextLink>Log in</BoldTextLink>
            </TouchableOpacity>
          </MessageContainer>
        </ScrollView>
      </ScreenContainer>
    )
  }
}

EmailVerification.propTypes = {
  navigation: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  resendEmail: PropTypes.func.isRequired,
  setRegistrationEmail: PropTypes.func.isRequired,
  clearUserData: PropTypes.func.isRequired,
  profileType: PropTypes.string.isRequired
}
