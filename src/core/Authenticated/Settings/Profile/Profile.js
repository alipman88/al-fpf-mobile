import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'
import capitalize from 'lodash/capitalize'

import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { ScreenContainer } from '@components/ScreenContainer'

import { BackButton } from '../components/BackButton'
import { Description } from '../components/Description'
import { Field } from '../components/Field'
import { FieldLabel } from '../components/FieldLabel'
import { FieldText } from '../components/FieldText'
import { ExternalLink } from '../components/ExternalLink'

export class Profile extends React.Component {
  state = {
    loading: false
  }

  render() {
    const { areas, navigateWithToken, profile } = this.props
    return (
      <ScreenContainer withPadding={false} grey>
        <KeyboardAwareScrollView>
          <Spinner visible={this.state.loading} />
          <Description>
            Currently in app edits to your account information can’t be made
            here, here, you’ll be taken to the FPF website to make these any
            changes clikcing the blue external links below.
          </Description>

          <FieldLabel bottomMargin={0}>Profile type</FieldLabel>
          <ExternalLink
            hasBorder
            hasLabel
            onPress={() =>
              navigateWithToken(`/user/profiles/${profile.id}/edit`, loading =>
                this.setState({ loading })
              )
            }
          >
            {capitalize(profile.profile_plan.plan_type)}
          </ExternalLink>

          <FieldLabel>Address</FieldLabel>
          <Field>
            <FieldText>
              {profile.street_number} {profile.street_name}{' '}
              {Boolean(profile.apt_number) && `# ${profile.apt_number}`}
            </FieldText>
            <FieldText>{profile.city}</FieldText>
            <FieldText>{profile.state}</FieldText>
          </Field>
          <FieldLabel>Forum(s)</FieldLabel>
          <Field>
            {profile.area_ids.map(areaId => (
              <FieldText key={areaId}>{areas[areaId].name}</FieldText>
            ))}
          </Field>
          <ExternalLink
            hasBorder
            onPress={() =>
              navigateWithToken(`/user/profiles/${profile.id}/edit`, loading =>
                this.setState({ loading })
              )
            }
          >
            Change your address
          </ExternalLink>
          <ExternalLink
            hasBorder
            onPress={() =>
              navigateWithToken(
                '/user/profiles/new?disable_plan_type_change=true&profile%5Bprofile_plan_id%5D=3',
                loading => this.setState({ loading })
              )
            }
          >
            Add a second home
          </ExternalLink>
          <ExternalLink
            onPress={() =>
              navigateWithToken(
                '/user/profiles/new?profile%5Bprofile_plan_id%5D=4',
                loading => this.setState({ loading })
              )
            }
          >
            Add government profile
          </ExternalLink>
        </KeyboardAwareScrollView>
      </ScreenContainer>
    )
  }
}

Profile.navigationOptions = ({ navigation }) => ({
  headerLeft: <BackButton navigation={navigation} />,
  title: 'My profile'
})

Profile.propTypes = {
  areas: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
