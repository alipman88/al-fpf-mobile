import React from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'
import startCase from 'lodash/startCase'

import { Config } from '@fpf/common/config'
import { ScreenContainer } from '@fpf/components/ScreenContainer'
import { HeaderLogo } from '@fpf/components/HeaderLogo'
import { profileTypes } from '@fpf/common/types/profileTypes'
import { openFpfUrl } from '@fpf/common/utils/openFpfUrl'
import {
  BottomContainer,
  BirdContainer,
  Bird,
  SuccessMessage,
  HelpMessage,
  MessageContainer,
  BoldTextLink,
  TextLink,
} from './styledComponents'

import yellowBird from '@fpf/assets/images/onboarding/yellow-bird.png'
import greyBird from '@fpf/assets/images/onboarding/grey-bird.png'
import LetterBird from '@fpf/assets/images/bird-letterbox/envelope-bird.png'

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
            {profileType === profileTypes.GOVERNMENT ||
            profileType === profileTypes.CANDIDATE ? (
              <HelpMessage>
                Your {startCase(profileType)} profile will be reviewed within 48
                hours. You will be notified once approved. Please{' '}
                <TextLink
                  onPress={() => openFpfUrl(`${Config.WEBSITE_HOST}/contact`)}
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
                  that email. Then log in to your FPF account.
                </HelpMessage>
                <HelpMessage>
                  Don't see the email message? It might take awhile. Please
                  check your spam folder, too. Thank you for your patience.
                </HelpMessage>
                <HelpMessage>
                  If you do not receive the confirmation email message, then
                  please{' '}
                  <TextLink
                    onPress={() => openFpfUrl(`${Config.WEBSITE_HOST}/contact`)}
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
  profileType: PropTypes.string.isRequired,
}
