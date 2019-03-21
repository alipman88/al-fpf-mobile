import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'
import { TouchableNativeFeedback } from 'react-native'
import { ButtonText, WrapperStyles } from './styledComponents'

const Wrapper = styled.View`
  ${WrapperStyles}
  ${({ fullWidth }) => (fullWidth ? 'width: 100%;' : '')}
  background-color: ${({ bgColor }) => bgColor || '#f29426'};
  ${({ width }) => width || 'inherit'};
`

export const Button = ({
  bgColor,
  children,
  disabled,
  fullWidth,
  width,
  onPress,
  color,
  iconRight,
  iconNameRight,
  iconLeft,
  iconNameLeft
}) => {
  return (
    <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
      <Wrapper bgColor={bgColor} fullWidth={fullWidth} width={width}>
        {iconLeft && iconNameLeft && (
          <Icon name={iconNameLeft} color={color || '#502c02'} size={26} />
        )}
        <ButtonText color={color}>{children}</ButtonText>
        {iconRight && iconNameRight && (
          <Icon name={iconNameRight} color={color || '#502c02'} size={26} />
        )}
      </Wrapper>
    </TouchableNativeFeedback>
  )
}

Button.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  width: PropTypes.number,
  color: PropTypes.string,
  iconRight: PropTypes.bool,
  iconLeft: PropTypes.bool,
  iconNameRight: PropTypes.string,
  iconNameLeft: PropTypes.string,
  onPress: PropTypes.func.isRequired
}
