import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ButtonText, WrapperStyles } from './styledComponents'

const Wrapper = styled.TouchableOpacity`
  ${WrapperStyles}
  background-color: ${({ bgColor }) => bgColor || '#f29426'};
  ${({ borderColor }) =>
    borderColor ? `border-width: 1; border-color: ${borderColor};` : ''}
  width: ${({ width }) => width || 'auto'};
  ${({ tall }) => tall && 'padding-vertical: 20px;'}
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
`

export const Button = ({
  bgColor,
  borderColor,
  children,
  disabled,
  fullWidth,
  width,
  onPress,
  color,
  iconRight,
  iconNameRight,
  iconLeft,
  iconNameLeft,
  tall,
  hasBorder,
  allowFontScaling,
}) => {
  return (
    <Wrapper
      borderColor={borderColor}
      bgColor={bgColor}
      disabled={disabled}
      fullWidth={fullWidth}
      onPress={onPress}
      width={width}
      tall={tall}
    >
      {iconLeft && iconNameLeft && (
        <Icon name={iconNameLeft} color={color || '#502c02'} size={26} />
      )}
      <ButtonText allowFontScaling={allowFontScaling} color={color}>
        {children}
      </ButtonText>
      {iconRight && iconNameRight && (
        <Icon name={iconNameRight} color={color || '#502c02'} size={26} />
      )}
    </Wrapper>
  )
}

Button.propTypes = {
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  tall: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  iconRight: PropTypes.bool,
  iconLeft: PropTypes.bool,
  hasBorder: PropTypes.bool,
  allowFontScaling: PropTypes.bool,
  iconNameRight: PropTypes.string,
  iconNameLeft: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}
