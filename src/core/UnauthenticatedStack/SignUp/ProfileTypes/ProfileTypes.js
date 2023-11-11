import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { profileTypes } from '@common/types/profileTypes'
import { FullScreenWizard } from '@components/FullScreenWizard'
import { ProfileTypeContainer, ProfileTypeText } from './styledComponents'
import { ProfileTypeButton } from './ProfileTypeButton'
import { retry } from '@common/utils/retry'

export class ProfileTypes extends React.Component {
  state = {
    profileOptions: [
      {
        buttonText: 'Neighbor',
        label: 'Personal account, just for me',
        type: profileTypes.NEIGHBOR,
        active: this.props.profileType === profileTypes.NEIGHBOR,
      },
      {
        buttonText: 'Business',
        label: 'For-profit business',
        type: profileTypes.BUSINESS,
        active: this.props.profileType === profileTypes.BUSINESS,
      },
      {
        buttonText: 'Nonprofit',
        label: 'Nonprofit organization, club, or community group',
        type: profileTypes.NONPROFIT,
        active: this.props.profileType === profileTypes.NONPROFIT,
      },
      {
        buttonText: 'Government',
        label:
          'Public official, muncipal department, public school, town library, etc.',
        type: profileTypes.GOVERNMENT,
        active: this.props.profileType === profileTypes.GOVERNMENT,
      },
    ],
  }

  componentDidMount() {
    this.getAppSettingsRetry = retry(this.props.getAppSettings)
  }

  componentWillUnmount() {
    if (this.getAppSettingsRetry) {
      this.getAppSettingsRetry.cancel()
    }
  }

  onTapProfileButton = (type) => {
    const profilePlan = this.props.profilePlans.find(
      (p) => p.plan_type === type
    )

    this.props.setNewUserByKey({ profilePlan })

    this.setState({
      profileOptions: this.state.profileOptions.map((profile) => {
        profile.active = profile.type === type
        return profile
      }),
    })

    this.props.navigation.navigate('BasicInfo')
  }

  render() {
    const { navigation, profileType, appSettingsLoaded } = this.props
    const profileTypeButtons = this.state.profileOptions.map((profileType) => {
      return (
        <ProfileTypeButton
          {...profileType}
          key={profileType.type}
          onTapHandler={this.onTapProfileButton}
          disabled={!appSettingsLoaded}
        />
      )
    })

    const nextButtonDisabled = isEmpty(profileType)

    return (
      <FullScreenWizard
        onBackPress={() => navigation.goBack()}
        onNextPress={() => {
          navigation.navigate('BasicInfo')
        }}
        nextDisabled={nextButtonDisabled}
      >
        <ProfileTypeContainer>
          <ProfileTypeText isHeader>
            How will you use this account?
          </ProfileTypeText>
          <ProfileTypeContainer>{profileTypeButtons}</ProfileTypeContainer>
        </ProfileTypeContainer>
      </FullScreenWizard>
    )
  }
}

ProfileTypes.propTypes = {
  setNewUserByKey: PropTypes.func.isRequired,
  getAppSettings: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  profilePlans: PropTypes.array.isRequired,
  profileType: PropTypes.string,
  appSettingsLoaded: PropTypes.bool.isRequired,
}
