import React from 'react'
import { Linking, Platform, View } from 'react-native'
import PropTypes from 'prop-types'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'

import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { ScreenContainer } from '@components/ScreenContainer'

import { Description } from '../components/Description'
import { Field } from '../components/Field'
import { FieldLabel } from '../components/FieldLabel'
import { FieldText } from '../components/FieldText'
import { ExternalLink } from '../components/ExternalLink'
import { NavLink } from '../components/NavLink'

export class Profile extends React.Component {
  render() {
    const {
      areas,
      canSubscribe,
      hasAppleSubscription,
      navigateWithToken,
      navigation,
      user,
      profile,
    } = this.props

    let subscriptionLink

    const canCreateProfile = !(user.permissions || []).includes(
      'cannot_create_profile',
    )
    const canManageProfile = profile.access === 'owner'
    const canUpdateProfilePlan =
      canManageProfile &&
      !(profile.permissions || []).includes('cannot_update_profile_plan')

    // LATER: it would be helpful to also check whether the current Apple ID
    // has a subscription.  If so, and user doesn't have one, then we could
    // informatively prevent user from trying to purchase another subscription.
    // Right now, that will just fail after the purchase attempt.

    if (Platform.OS === 'ios') {
      // If current profile has IAP subscription, link to native IAP management URL
      if (canManageProfile && hasAppleSubscription) {
        subscriptionLink = (
          <ExternalLink
            onPress={() =>
              Linking.openURL('https://apps.apple.com/account/subscriptions')
            }
            hasLabel
            hasBorder={true}
          >
            Manage FPF Plan
          </ExternalLink>
        )
      }
      // If current profile can subscribe, show subscribe view link
      else if (canSubscribe && canUpdateProfilePlan) {
        subscriptionLink = (
          <NavLink
            linkText='Upgrade FPF Plan'
            onPress={() =>
              navigation.navigate('Subscription', { profileId: profile.id })
            }
            hasBorder={true}
          />
        )
      }
    }

    return (
      <ScreenContainer withPadding={false} grey>
        <KeyboardAwareScrollView>
          {canManageProfile && (
            <View>
              <Description>
                To edit your account, click on the link below to open the FPF
                website in your browser.
              </Description>
              <FieldLabel bottomMargin={0}>Profile type</FieldLabel>
              <ExternalLink
                hasBorder={!subscriptionLink}
                hasLabel
                onPress={() =>
                  navigateWithToken(`/user/profiles/${profile.id}/edit`)
                }
              >
                {capitalize(profile.profile_plan.plan_type)}
              </ExternalLink>
            </View>
          )}

          {subscriptionLink}

          <FieldLabel>Address</FieldLabel>
          <Field>
            <FieldText>
              {profile.street_number} {profile.street_name}{' '}
              {Boolean(profile.apt_number) && `# ${profile.apt_number}`}
            </FieldText>
            <FieldText>{profile.city}</FieldText>
            <FieldText>{profile.state}</FieldText>
          </Field>
          <FieldLabel>Home Forum</FieldLabel>
          <Field>
            <FieldText>{get(areas[profile.home_nf], 'name')}</FieldText>
          </Field>
          {profile.area_ids.length > 1 && (
            <React.Fragment>
              <FieldLabel>Additional Forums</FieldLabel>
              <Field>
                {profile.area_ids
                  .filter((id) => id !== profile.home_nf)
                  .map((areaId) => (
                    <FieldText key={areaId}>{areas[areaId].name}</FieldText>
                  ))}
              </Field>
            </React.Fragment>
          )}

          {canManageProfile && (
            <ExternalLink
              hasBorder
              onPress={() =>
                navigateWithToken(`/user/profiles/${profile.id}/edit`)
              }
            >
              Change your address
            </ExternalLink>
          )}

          {canCreateProfile && (
            <ExternalLink
              hasBorder
              onPress={() =>
                navigateWithToken(
                  '/user/profiles/new?disable_plan_type_change=true&profile%5Bprofile_plan_id%5D=3',
                )
              }
            >
              Add a second home
            </ExternalLink>
          )}

          {canCreateProfile && (
            <ExternalLink
              onPress={() =>
                navigateWithToken(
                  '/user/profiles/new?profile%5Bprofile_plan_id%5D=4',
                )
              }
            >
              Add government profile
            </ExternalLink>
          )}
        </KeyboardAwareScrollView>
      </ScreenContainer>
    )
  }
}

Profile.propTypes = {
  areas: PropTypes.object.isRequired,
  canSubscribe: PropTypes.bool,
  hasAppleSubscription: PropTypes.bool,
  navigateWithToken: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}
