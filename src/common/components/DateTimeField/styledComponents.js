import styled from 'styled-components/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text } from '@components/Text'

export const Container = styled.View``

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Input = styled.TouchableOpacity`
  border-radius: 5;
  border-width: 1;
  border-color: ${({ hasError }) => (hasError ? '#dc4558' : '#d5dde1')};
  background-color: ${({ hasError }) => (hasError ? '#ffebeb' : '#fff')};
  padding: 8px 15px 0px 4px;
  flex: 1;
  flex-direction: row;
  height: 40;
  justify-content: flex-start;
  margin-right: ${({ marginRight }) => marginRight || 0};
`

export const InputText = styled(Text)`
  color: ${({ touched }) => (touched ? '#000' : '#c5c5c5')};
  font-size: 18;
`

export const Icon = styled(Ionicons)`
  margin-right: 6;
`
