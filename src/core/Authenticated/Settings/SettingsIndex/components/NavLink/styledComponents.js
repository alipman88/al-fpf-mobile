import styled from 'styled-components/native'

import { Text } from '@components/Text'

export const LinkContainer = styled.TouchableOpacity`
  padding-horizontal: 20;
  padding-vertical: 11;
  background-color: #fff;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-top-width: 1;
  ${({ hasBorder }) => hasBorder && 'border-bottom-width: 1;'}
  border-color: #c5c5c5;
`

export const LinkText = styled(Text)`
  font-size: 16;
  color: #4a4a4a;
`
