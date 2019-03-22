import React from 'react'
import PropTypes from 'prop-types'
import { Platform, Switch, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import uuid from 'uuid/v4'

import { ScreenContainer } from '@components/ScreenContainer'

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
  SettingsPair
} from './styledComponents'

export class Account extends React.Component {
  state = {
    loading: false
  }

  render() {
    const { loading, navigateWithToken, user, updateUser } = this.props
    return (
      <ScreenContainer withPadding={false} grey>
        <Spinner visible={loading || this.state.loading} />
        <Description>
          To edit your account, click links below to go to our website.
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
              value={user.receive_push_notifications}
              trackColor={{ true: '#355768' }}
              thumbColor={Platform.select({ android: '#355768' })}
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

        <ExternalLink
          hasBorder
          onPress={() =>
            navigateWithToken('/user', loading => this.setState({ loading }))
          }
        >
          Edit account details
        </ExternalLink>
        <ExternalLink
          onPress={() =>
            // URL on site uses a generated hash, but ideally it should just be /user/subscriptions
            // so this UUID is temporary work around
            navigateWithToken(`/user/${uuid()}/subscriptions`, loading =>
              this.setState({ loading })
            )
          }
        >
          Manage my email subscriptions
        </ExternalLink>
        <TouchableOpacity
          onPress={() =>
            navigateWithToken('/user', loading => this.setState({ loading }))
          }
        >
          <CloseAccountText>Close my account</CloseAccountText>
        </TouchableOpacity>
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
