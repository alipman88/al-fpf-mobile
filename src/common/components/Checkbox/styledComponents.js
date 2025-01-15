import styled from 'styled-components/native'
import { Text } from '@fpf/components/Text'

export const Button = styled.View`
  border-radius: 4px;
  border-width: 1px;
  border-color: #90a780;
  background-color: ${({ checked }) => (checked ? '#355768' : 'transparent')};
  height: 18px;
  width: 18px;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`

export const Icon = styled.Image``

export const Label = styled(Text)`
  flex: 1;
`

export const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
`
