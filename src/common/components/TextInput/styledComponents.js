import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const Container = styled.View`
  margin-bottom: 19;
`

export const Label = styled(Text)`
  font-size: 15;
  margin-bottom: 3;
`

export const Input = styled.TextInput`
  border-radius: 5;
  border-width: 1;
  border-color: ${({ hasError }) => (hasError ? '#dc4558' : '#d5dde1')};
  background-color: ${({ hasError }) => (hasError ? '#ffebeb' : '#fff')};
  height: 40;
`

export const Error = styled(Text)`
  color: red;
  font-size: 14;
  margin-top: 4;
`
