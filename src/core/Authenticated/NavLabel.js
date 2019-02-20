import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const NavLabel = styled(Text)`
  color: ${({ focused }) => (focused ? '#D77400' : '#918F90')};
  text-align: center;
`
