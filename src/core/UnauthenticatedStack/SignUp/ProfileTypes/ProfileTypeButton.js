import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'

import { ProfileTypePill, PillText, ProfileTypeText } from './styledComponents'

export const ProfileTypeButton = ({
  profileType,
  onTapHandler,
  children,
  disabled,
  buttonText,
  label,
  active
}) => {
  return (
    <View>
      <TouchableOpacity>
        <ProfileTypePill active={active}>
          <PillText>{buttonText}</PillText>
        </ProfileTypePill>
      </TouchableOpacity>
      <ProfileTypeText>{label}</ProfileTypeText>
    </View>
  )
}
