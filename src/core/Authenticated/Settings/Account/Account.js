import React from 'react'
import PropTypes from 'prop-types'
import { Switch, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import { ScreenContainer } from '@components/ScreenContainer'
import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'

import { BackButton } from '../components/BackButton'
import { Description } from '../components/Description'
import { Field } from '../components/Field'
import { FieldLabel } from '../components/FieldLabel'
import { ExternalLink } from '../components/ExternalLink'
import { FieldText } from '../components/FieldText'

import {
  CloseAccountText,
  Notifications,
  SettingsDescription,
  SettingsDescriptionBold,
  SettingsLabel,
  SettingsPair,
  LinkContainer
} from './styledComponents'

export class Account extends React.Component {
  render() {
    const { loading, navigateWithToken, user, updateUser } = this.props
    return (
      <ScreenContainer withPadding={false} grey>
        <KeyboardAwareScrollView>
          <Spinner visible={loading} />
          <Description>
            Currently in app edits to your account information can't be made in
            the app. To edit your account, click on the desired link below, and
            it will open the FPF website in your browser.
          </Description>
          <FieldLabel>Name</FieldLabel>
          <Field>
            <FieldText>
              {user.first_name} {user.last_name}
            </FieldText>
          </Field>
          <FieldLabel>Email</FieldLabel>
          <Field>
            <FieldText>{user.email}</FieldText>
          </Field>
          <FieldLabel>Notifications</FieldLabel>
          <Notifications>
            <SettingsPair>
              <SettingsLabel>Receive Notifications</SettingsLabel>
              <Switch
                onValueChange={value =>
                  updateUser({ receive_push_notifications: value })
                }
                trackColor={{
                  false: 'red',
                  true: 'green'
                }}
                ios_backgroundColor='red'
                value={user.receive_push_notifications}
              />
            </SettingsPair>
            <SettingsDescription>
              Turn this on to be notified about each new issue of your
              neighborhood forum.{' '}
              <SettingsDescriptionBold>
                This will not affect your email newsletter settings.
              </SettingsDescriptionBold>
            </SettingsDescription>
          </Notifications>

          <ExternalLink hasBorder onPress={() => navigateWithToken('/user')}>
            Edit account details
          </ExternalLink>
          <ExternalLink
            onPress={() => navigateWithToken('/user/subscriptions')}
          >
            Manage my email subscriptions
          </ExternalLink>
          <LinkContainer>
            <TouchableOpacity onPress={() => navigateWithToken('/user')}>
              <CloseAccountText>Close my account</CloseAccountText>
            </TouchableOpacity>
          </LinkContainer>
        </KeyboardAwareScrollView>
      </ScreenContainer>
    )
  }
}

Account.navigationOptions = ({ navigation }) => ({
  headerLeft: <BackButton navigation={navigation} />,
  title: 'My account'
})

Account.propTypes = {
  loading: PropTypes.bool,
  navigateWithToken: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}
