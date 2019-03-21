import React from 'react'
import PropTypes from 'prop-types'
import { FullScreenWizard } from '@components/FullScreenWizard'
import { Text } from '@components/Text'

import { ProfileTypeContainer, ProfileTypeText } from './styledComponents'
import { ProfileButton } from './ProfileButton'

export class ProfileTypes extends React.Component {
  render() {
    return (
      <FullScreenWizard>
        <ProfileTypeContainer>
          <ProfileTypeText isHeader extraMargin>
            How will you use this account?
          </ProfileTypeText>

          <ProfileButton>Neighbor</ProfileButton>
          <ProfileTypeText>Personal account, just for me</ProfileTypeText>

          <ProfileButton>Business/Nonprofit</ProfileButton>
          <ProfileTypeText>Business or nonprofit organization</ProfileTypeText>

          <ProfileButton>Government</ProfileButton>
          <ProfileTypeText>
            Public official, muncipal department, public school, town library,
            etc.
          </ProfileTypeText>
        </ProfileTypeContainer>
      </FullScreenWizard>
    )
  }
}

ProfileTypes.PropTypes = {}
