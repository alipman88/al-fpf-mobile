import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ButtonText, WrapperStyles } from './styledComponents'

const Wrapper = styled.TouchableOpacity`
  ${WrapperStyles}
`

export const Button = ({ children, disabled, onPress }) => {
  return (
    <Wrapper disabled={disabled} onPress={onPress}>
      <ButtonText>{children}</ButtonText>
    </Wrapper>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired
}
