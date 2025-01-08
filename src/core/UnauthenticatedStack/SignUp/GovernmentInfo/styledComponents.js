import styled from 'styled-components/native'

import { Text } from '@fpf/components/Text'
import { paddingHorizontal } from '@fpf/common/styles/screenPadding'

export const Container = styled.View`
  padding-horizontal: ${paddingHorizontal}px;
`

export const Description = styled(Text)`
  font-size: 18px;
  color: #8d8d8d;
  margin-horizontal: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`

export const FieldWrapper = styled.View`
  margin-bottom: 15px;
  margin-top: 5px;
`
