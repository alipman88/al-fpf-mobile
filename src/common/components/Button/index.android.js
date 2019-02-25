import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { TouchableNativeFeedback } from 'react-native'
import { ButtonText, WrapperStyles } from './styledComponents'

const Wrapper = styled.View`
  ${WrapperStyles}
`

export const Button = ({ children, disabled, onPress, color }) => {
  return (
    <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
      <Wrapper>
        <ButtonText color={color}>{children}</ButtonText>
      </Wrapper>
    </TouchableNativeFeedback>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired
}
