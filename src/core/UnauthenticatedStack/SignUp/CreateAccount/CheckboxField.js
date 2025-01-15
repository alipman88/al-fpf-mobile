import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { openFpfUrl } from '@fpf/common/utils/openFpfUrl'

import { Config } from '@fpf/common/config'
import { Text } from '@fpf/components/Text'
import { Checkbox } from '@fpf/components/Checkbox'
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
            onPress={() => openFpfUrl(`${Config.WEBSITE_HOST}/terms-of-use`)}
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
