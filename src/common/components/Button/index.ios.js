import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ButtonText, WrapperStyles } from './styledComponents'

const Wrapper = styled.TouchableOpacity`
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
    <Wrapper
      bgColor={bgColor}
      disabled={disabled}
      fullWidth={fullWidth}
      onPress={onPress}
    >
      <ButtonText color={color}>{children}</ButtonText>
    </Wrapper>
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
