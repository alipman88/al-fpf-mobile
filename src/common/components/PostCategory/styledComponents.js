import styled from 'styled-components/native'
import { Text } from '@fpf/components/Text'
import { Pill as BasePill } from '@fpf/components/Post/styledComponents'

export const Pill = styled(BasePill)`
  background-color: ${({ labelStyle }) => labelStyle.background};
`

export const CategoryText = styled(Text)`
  color: ${({ labelStyle }) => labelStyle.color};
`
