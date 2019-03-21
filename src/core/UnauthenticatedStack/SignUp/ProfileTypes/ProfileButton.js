import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'

import { ProfileTypePill, PillText } from './styledComponents'

export const ProfileButton = ({ profileType, onTapHandler, children }) => {
  return (
    <View>
      <TouchableOpacity>
        <ProfileTypePill>
          <PillText>{children}</PillText>
        </ProfileTypePill>
      </TouchableOpacity>
    </View>
  )
}
