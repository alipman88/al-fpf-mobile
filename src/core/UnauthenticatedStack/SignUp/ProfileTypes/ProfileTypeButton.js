import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'

import checkBox from '@assets/images/global-assets/form-elements/checkbox-tick.png'
import {
  ProfileTypePill,
  PillText,
  ProfileTypeText,
  CheckBox,
} from './styledComponents'

export const ProfileTypeButton = ({
  onTapHandler,
  buttonText,
  label,
  type,
  active,
  disabled,
}) => {
  const check = active && (
    <View style={{ paddingLeft: 15 }}>
      <CheckBox source={checkBox} />
    </View>
  )
  return (
    <View>
      <TouchableOpacity onPress={() => onTapHandler(type)} disabled={disabled}>
        <ProfileTypePill active={active} image={check}>
          <PillText active={active}>{buttonText}</PillText>
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
  active: PropTypes.bool,
  disabled: PropTypes.bool,
}
