import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'

import { ProfileTypePill, PillText, ProfileTypeText } from './styledComponents'

export const ProfileTypeButton = ({
  profileType,
  onTapHandler,
  children,
  buttonText,
  label,
  type,
  active
}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onTapHandler(type)}>
        <ProfileTypePill active={active}>
          <PillText>{buttonText}</PillText>
        </ProfileTypePill>
      </TouchableOpacity>
      <ProfileTypeText>{label}</ProfileTypeText>
    </View>
  )
}

ProfileTypeButton.propTypes = {
  onTapHandler: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool
}
