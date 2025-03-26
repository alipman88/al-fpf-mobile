import styled from 'styled-components/native'

export const Container = styled.View``

export const StyledTextInput = styled.TextInput`
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ hasError }) => (hasError ? '#dc4558' : '#d5dde1')};
  background-color: #fff;
  ${({ hasError }) => hasError && 'background-color: #ffebeb;'}
  ${({ editable }) => !editable && 'background-color: #e8e9f2;'}
  padding-right: 4px;
  padding-left: ${({ hasForwardIcon }) => (hasForwardIcon ? 30 : 4)}px;
  ${({ multiline }) =>
    multiline ? 'height: 160px; textAlignVertical: top;' : 'height: 40px;'}
  font-family: ProximaNova-Regular;
  color: #000;
`

export const IconContainer = styled.View`
  position: absolute;
  right: 10px;
`

export const ForwardIcon = styled.View`
  position: absolute;
  left: 5px;
  top: 10px;
`
