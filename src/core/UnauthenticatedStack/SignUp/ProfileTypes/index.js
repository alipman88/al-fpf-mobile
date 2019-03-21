import React from 'react'
import PropTypes from 'prop-types'

import { profileTypes } from '@common/types/profileTypes'
import { FullScreenWizard } from '@components/FullScreenWizard'
import { Text } from '@components/Text'

import { ProfileTypeContainer, ProfileTypeText } from './styledComponents'
import { ProfileTypeButton } from './ProfileTypeButton'

export class ProfileTypes extends React.Component {
  render() {
    const profileTypeButtons = [
      {
        buttonText: 'Neighhbor',
        label: 'Personal account, just for me',
        type: profileTypes.NEIGHBOR
      },
      {
        buttonText: 'Business/Nonprofit',
        label: 'Business or nonprofit organization',
        type: profileTypes.BUSINESS
      },
      {
        buttonText: 'Government',
        label:
          'Public official, muncipal department, public school, town library, etc.',
        type: profileTypes.GOVERNMENT
      }
    ].map(profileType => {
      return <ProfileTypeButton {...profileType} />
    })

    return (
      <FullScreenWizard>
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

ProfileTypes.PropTypes = {}
