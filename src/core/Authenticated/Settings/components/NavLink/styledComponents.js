import styled from 'styled-components/native'

import { Text } from '@fpf/components/Text'

export const LinkContainer = styled.TouchableOpacity`
  padding-horizontal: 20px;
  padding-vertical: 11px;
  background-color: #fff;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  ${({ hasBorder }) => hasBorder && 'border-bottom-width: 1px;'}
  border-color: #c5c5c5;
`

export const LinkText = styled(Text)`
  font-size: 16px;
  color: #4a4a4a;
`
