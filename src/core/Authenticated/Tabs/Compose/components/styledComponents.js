import styled from 'styled-components/native'

import { Text } from '@fpf/components/Text'
import { paddingTop, paddingHorizontal } from '@fpf/common/styles/screenPadding'

export const FormContainer = styled.View`
  padding-top: ${paddingTop}px;
`

export const InputDetails = styled(Text)`
  font-size: 12px;
  color: #9b9b9b;
  margin-vertical: 10px;
`

export const FieldWrapper = styled.View`
  margin-bottom: 10px;
  padding-horizontal: ${paddingHorizontal}px;
`

export const ButtonContainer = styled.View`
  background-color: white;
  padding-horizontal: ${paddingHorizontal}px;
  padding-vertical: 25px;
`

export const ButtonSpacer = styled.View`
  height: 20px;
  width: 100%;
`
