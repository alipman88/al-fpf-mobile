import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, Wrapper } from './styledComponents'
import checkboxTick from '@fpf/assets/images/global-assets/form-elements/checkbox-tick.png'

export const Checkbox = ({ children, onPress, value }) => (
  <Wrapper onPress={() => onPress(!value)}>
    <Button checked={value}>
      {value ? <Icon source={checkboxTick} /> : null}
    </Button>
    <Label>{children}</Label>
  </Wrapper>
)

Checkbox.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func.isRequired,
  value: PropTypes.bool,
}
