import styled from 'styled-components/native'

export const Container = styled.View``

export const Input = styled.TextInput`
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

export const Icon = styled.Image`
  height: 25;
  width: 40;
  position: absolute;
  resize-mode: contain;
  right: 10;
  top: 25;
`

export const ForwardIcon = styled.View`
  position: absolute;
  left: 5;
  top: 10;
`
