import React from 'react'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'
import { Image, TouchableOpacity } from 'react-native'
import { openFpfUrl } from '@common/utils/openFpfUrl'
import Spinner from 'react-native-loading-spinner-overlay'

import { Config } from '@common/config'
import { ScreenContainer } from '@components/ScreenContainer'
import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { getProfileDisplayName } from '@common/utils/getProfileDisplayName'
import { NavLink } from '../components/NavLink'
import { FieldLabel } from '../components/FieldLabel'
import { FieldHeading } from '../components/FieldHeading'

import {
  Container,
  LogoutText,
  Navigation,
  Version,
  ViewPostings,
  ExternalLinkContainer,
} from './styledComponents'

import linkIcon from '@assets/images/global-assets/external-link-icons/external-link-icon-blue.png'

let envDisplay = ['development', 'staging'].includes(Config.ENVIRONMENT)
  ? ` : ${Config.ENVIRONMENT}`
  : ''

export class SettingsIndex extends React.Component {
  state = {
    loading: false,
  }

  constructor(props) {
    super(props)

    this.props.getProfiles()
  }

  async logoutUser() {
    this.props.logoutUser(
      this.props.navigation,
      { fcm_token: this.props.fcmToken },
      this.setLoading
    )
  }

  setLoading = (loadingVal) => {
    this.setState({ loading: loadingVal })
  }

  render() {
    const { navigateWithToken, navigation, user } = this.props
    return (
      <ScreenContainer grey withPadding={false}>
        <KeyboardAwareScrollView>
          <Spinner visible={this.state.loading} />
          <Container>
            <Navigation>
              <FieldHeading>Account</FieldHeading>
              <FieldLabel style={{ marginTop: 12 }}>My account</FieldLabel>
              <NavLink
                linkText={`${user.first_name} ${user.last_name}`}
                onPress={() => navigation.navigate('Account')}
                hasBorder={true}
              />
              <FieldLabel>My profile(s)</FieldLabel>
              {user.profiles.map((profile, i, arr) => (
                <NavLink
                  linkText={getProfileDisplayName(profile)}
                  key={profile.id}
                  onPress={() =>
                    navigation.navigate('Profile', { profileId: profile.id })
                  }
                  hasBorder={arr.length === i + 1}
                />
              ))}
              <TouchableOpacity
                onPress={() =>
                  navigateWithToken('/user/posts', (loading) =>
                    this.setState({ loading })
                  )
                }
              >
                <ExternalLinkContainer style={{ marginTop: 18 }}>
                  <ViewPostings>View my postings</ViewPostings>
                  <Image source={linkIcon} />
                </ExternalLinkContainer>
              </TouchableOpacity>
              <FieldHeading style={{ marginTop: 30 }}>Help</FieldHeading>
              <TouchableOpacity
                onPress={() => openFpfUrl('https://help.frontporchforum.com')}
              >
                <ExternalLinkContainer>
                  <ViewPostings>Member Support</ViewPostings>
                  <Image source={linkIcon} />
                </ExternalLinkContainer>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  openFpfUrl(`${Config.WEBSITE_HOST}/privacy-policy`)
                }
              >
                <ExternalLinkContainer>
                  <ViewPostings>Privacy Policy</ViewPostings>
                  <Image source={linkIcon} />
                </ExternalLinkContainer>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  openFpfUrl(`${Config.WEBSITE_HOST}/terms-of-use`)
                }
              >
                <ExternalLinkContainer>
                  <ViewPostings>Terms of Use</ViewPostings>
                  <Image source={linkIcon} />
                </ExternalLinkContainer>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openFpfUrl(`${Config.WEBSITE_HOST}/about-us`)}
              >
                <ExternalLinkContainer>
                  <ViewPostings>About FPF</ViewPostings>
                  <Image source={linkIcon} />
                </ExternalLinkContainer>
              </TouchableOpacity>
              <Version>
                v{DeviceInfo.getVersion()} #{DeviceInfo.getBuildNumber()}
                {envDisplay}
              </Version>
            </Navigation>
            <TouchableOpacity onPress={() => this.logoutUser()}>
              <LogoutText>Log out</LogoutText>
            </TouchableOpacity>
          </Container>
        </KeyboardAwareScrollView>
      </ScreenContainer>
    )
  }
}

SettingsIndex.propTypes = {
  navigation: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  fcmToken: PropTypes.string,
}
