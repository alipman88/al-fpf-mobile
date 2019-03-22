import React from 'react'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'
import { Image, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import { ScreenContainer } from '@components/ScreenContainer'
import { createResetStackTo } from '@common/utils/navigation'
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

export class SettingsIndex extends React.Component {
  state = {
    loading: false
  }

  render() {
    const { navigateWithToken, navigation, resetAction, user } = this.props
    return (
      <ScreenContainer grey withPadding={false}>
        <Spinner visible={this.state.loading} />
        <Container>
          <Navigation>
            <FieldLabel>My account(s)</FieldLabel>
            <NavLink
              linkText={`${user.first_name} ${user.last_name}`}
              onPress={() => navigation.navigate('Account')}
            />
            <FieldLabel>My profile(s)</FieldLabel>
            {user.profiles.map(profile => (
              <NavLink
                linkText={getProfileDisplayName(profile)}
                key={profile.id}
                onPress={() =>
                  navigation.navigate('Profile', { profileId: profile.id })
                }
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
                <ViewPostings>View Postings</ViewPostings>
                <Image source={linkIcon} />
              </ViewPostingsContainer>
            </TouchableOpacity>
            <Version>
              Version: v{DeviceInfo.getVersion()} #{DeviceInfo.getBuildNumber()}
            </Version>
          </Navigation>
          <TouchableOpacity
            onPress={() => {
              resetAction()
              navigation.navigate('SplashScreen')
              navigation.dispatch(createResetStackTo('Login'))
            }}
          >
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
  resetAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
