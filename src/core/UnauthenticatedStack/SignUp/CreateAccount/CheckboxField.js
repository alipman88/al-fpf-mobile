import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@components/Text'
import { Checkbox } from '@components/Checkbox'
import { CheckboxWrapper } from './styledComponents'

export const CheckboxField = ({
  type,
  text,
  truthiness,
  onToggle,
  last,
  first
}) => {
  return (
    <CheckboxWrapper last={last} first={first}>
      <Checkbox onPress={value => onToggle(type, value)} value={truthiness}>
        <Text>{text}</Text>
      </Checkbox>
    </CheckboxWrapper>
  )
}

CheckboxField.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  truthiness: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  last: PropTypes.bool,
  first: PropTypes.bool
}
