import React from 'react'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'
import { Image, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Config from 'react-native-config'

import { ScreenContainer } from '@components/ScreenContainer'
import { getProfileDisplayName } from '@common/utils/getProfileDisplayName'
import { NavLink } from './components/NavLink'
import { FieldLabel } from '../components/FieldLabel'

import {
  Container,
  LogoutText,
  Navigation,
  Version,
  ViewPostings,
  ViewPostingsContainer
} from './styledComponents'

import linkIcon from '@assets/images/global-assets/external-link-icons/external-link-icon-blue.png'

let envDisplay = ['development', 'staging'].includes(Config.ENVIRONMENT)
  ? ` : ${Config.ENVIRONMENT}`
  : ''

export class SettingsIndex extends React.Component {
  state = {
    loading: false
  }

  async logoutUser() {
    this.props.logoutUser(
      this.props.navigation,
      { fcm_token: this.props.fcmToken },
      this.setLoading
    )
  }

  setLoading = loadingVal => {
    this.setState({ loading: loadingVal })
  }

  render() {
    const { navigateWithToken, navigation, user } = this.props
    return (
      <ScreenContainer grey withPadding={false}>
        <Spinner visible={this.state.loading} />
        <Container>
          <Navigation>
            <FieldLabel>My account(s)</FieldLabel>
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
                navigateWithToken('/user/posts', loading =>
                  this.setState({ loading })
                )
              }
            >
              <ViewPostingsContainer>
                <ViewPostings>View my postings</ViewPostings>
                <Image source={linkIcon} />
              </ViewPostingsContainer>
            </TouchableOpacity>
            <Version>
              v{DeviceInfo.getVersion()} #{DeviceInfo.getBuildNumber()}
              {envDisplay}
            </Version>
          </Navigation>
          <TouchableOpacity onPress={() => this.logoutUser()}>
            <LogoutText>Logout</LogoutText>
          </TouchableOpacity>
        </Container>
      </ScreenContainer>
    )
  }
}

SettingsIndex.navigationOptions = {
  title: 'Settings'
}

SettingsIndex.propTypes = {
  navigation: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  fcmToken: PropTypes.string
}
