import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'
import { TouchableNativeFeedback } from 'react-native'
import { ButtonText, WrapperStyles } from './styledComponents'

const Wrapper = styled.View`
  ${WrapperStyles}
  background-color: ${({ bgColor }) => bgColor || '#f29426'};
  ${({ borderColor }) =>
    borderColor ? `border-width: 1px; border-color: ${borderColor};` : ''}
  width: ${({ width }) =>
    typeof width == 'number' ? `${width}px` : width || 'auto'};
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
  hasBorder,
  tall,
}) => {
  return (
    <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
      <Wrapper
        borderColor={borderColor}
        bgColor={bgColor}
        fullWidth={fullWidth}
        width={width}
        tall={tall}
      >
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
  iconNameRight: PropTypes.string,
  iconNameLeft: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}
