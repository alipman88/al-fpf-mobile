import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const Pill = styled.View`
  background-color: ${({ labelStyle }) => labelStyle.background};
  padding: 1px 10px 1px 10px;
  margin: 0 2px 2px 0;
  border-radius: 5px;
  border-color: #355768;
  align-self: flex-start;
`

export const CategoryText = styled(Text)`
  color: ${({ labelStyle }) => labelStyle.color};
`
