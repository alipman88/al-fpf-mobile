import styled from 'styled-components/native'

export const Container = styled.View``

export const StyledTextInput = styled.TextInput`
  border-radius: 5;
  border-width: 1;
  border-color: ${({ hasError }) => (hasError ? '#dc4558' : '#d5dde1')};
  background-color: ${({ hasError }) => (hasError ? '#ffebeb' : '#fff')};
  padding-right: 4;
  padding-left: ${({ hasForwardIcon }) => (hasForwardIcon ? 30 : 4)}
  ${({ multiline }) =>
    multiline ? 'height: 160; textAlignVertical: top' : 'height: 40;'}
  font-family: ProximaNova-Regular;
  color: #000;
`

export const IconContainer = styled.View`
  position: absolute;
  right: 10;
`

export const ForwardIcon = styled.View`
  position: absolute;
  left: 5;
  top: 10;
`
