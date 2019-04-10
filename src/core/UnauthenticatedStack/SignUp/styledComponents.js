import styled from 'styled-components/native'
import { Text } from '@components/Text'

import { screenPadding } from '@common/styles/screenPadding'

export const FormHeader = styled(Text)`
  font-size: 16;
  text-align: center;
  margin-vertical: 32;
`

export const FormHelper = styled(Text)`
  color: #9b9b9b;
  margin-bottom: 11;
`
export const FieldWrapper = styled.View`
  margin-bottom: 11;
  max-width: 380;
`
export const FormFieldsWrapper = styled.View`
  padding-bottom: 100;
`

export const Container = styled.ScrollView`
  ${screenPadding}
`
