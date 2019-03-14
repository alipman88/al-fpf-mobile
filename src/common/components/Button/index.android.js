import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { TouchableNativeFeedback } from 'react-native'
import { ButtonText, WrapperStyles } from './styledComponents'

const Wrapper = styled.View`
  ${WrapperStyles}
  ${({ fullWidth }) => (fullWidth ? 'width: 100%;' : '')}
  background-color: ${({ bgColor }) => bgColor || '#f29426'};
`

export const Button = ({
  bgColor,
  children,
  disabled,
  fullWidth,
  onPress,
  color
}) => {
  return (
    <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
      <Wrapper bgColor={bgColor} fullWidth={fullWidth}>
        <ButtonText color={color}>{children}</ButtonText>
      </Wrapper>
    </TouchableNativeFeedback>
  )
}

Button.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired
}
