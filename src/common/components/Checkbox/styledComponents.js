import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const Button = styled.View`
  border-radius: 4;
  border-width: 1;
  border-color: #90a780;
  background-color: ${({ checked }) => (checked ? '#355768' : 'transparent')};
  height: 18;
  width: 18;
  align-items: center;
  justify-content: center;
  margin-right: 5;
`

export const Icon = styled.Image``

export const Label = styled(Text)`
  flex: 1;
`

export const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
`
