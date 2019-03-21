import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ButtonText, WrapperStyles } from './styledComponents'

const Wrapper = styled.TouchableOpacity`
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
    <Wrapper
      bgColor={bgColor}
      disabled={disabled}
      fullWidth={fullWidth}
      onPress={onPress}
      width={width}
    >
      {iconLeft && iconNameLeft && (
        <Icon name={iconNameLeft} color={color || '#502c02'} size={26} />
      )}
      <ButtonText color={color}>{children}</ButtonText>
      {iconRight && iconNameRight && (
        <Icon name={iconNameRight} color={color || '#502c02'} size={26} />
      )}
    </Wrapper>
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
