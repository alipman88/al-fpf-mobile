import styled from 'styled-components/native'

import { Text } from '@components/Text'
import { screenPadding, paddingHorizontal } from '@common/styles/screenPadding'

export const FormContainer = styled.View`
  ${screenPadding}
`

export const InputDetails = styled(Text)`
  font-size: 12;
  color: #9b9b9b;
  margin-vertical: 10;
`

export const FieldWrapper = styled.View`
  margin-bottom: 10;
`

export const ButtonContainer = styled.View`
  background-color: white;
  padding-horizontal: ${paddingHorizontal};
  padding-vertical: 25;
`

export const ButtonSpacer = styled.View`
  height: 20;
  width: 100%;
`
