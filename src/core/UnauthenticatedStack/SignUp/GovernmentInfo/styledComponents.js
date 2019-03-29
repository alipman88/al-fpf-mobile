import styled from 'styled-components/native'

import { Text } from '@components/Text'
import { paddingHorizontal } from '@common/styles/screenPadding'

export const Container = styled.View`
  padding-horizontal: ${paddingHorizontal};
`

export const Description = styled(Text)`
  font-size: 18;
  color: #8d8d8d;
  margin-horizontal: 20;
  margin-top: 30;
  margin-bottom: 30;
  text-align: center;
`

export const FieldWrapper = styled.View`
  margin-bottom: 15;
  margin-top: 5;
`
