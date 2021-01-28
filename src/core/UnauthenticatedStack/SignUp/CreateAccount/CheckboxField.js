import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Linking } from 'react-native'

import { Config } from '@common/config'
import { Text } from '@components/Text'
import { Checkbox } from '@components/Checkbox'
import {
  CheckboxWrapper,
  LinkWrapper,
  LinkText,
  RequiredText,
} from './styledComponents'

export const CheckboxField = ({
  type,
  text,
  truthiness,
  onToggle,
  last,
  first,
}) => {
  return (
    <CheckboxWrapper last={last} first={first}>
      <Checkbox onPress={(value) => onToggle(type, value)} value={truthiness}>
        <Text>{text}</Text>
      </Checkbox>
      {type === 'termsOfUse' && (
        <LinkWrapper>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`${Config.WEBSITE_HOST}/terms-of-use`)
            }
          >
            <LinkText>Terms of Use</LinkText>
          </TouchableOpacity>
          <RequiredText>(Required)</RequiredText>
        </LinkWrapper>
      )}
    </CheckboxWrapper>
  )
}

CheckboxField.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  truthiness: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  last: PropTypes.bool,
  first: PropTypes.bool,
}
