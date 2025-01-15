import styled from 'styled-components/native'
import { Text } from '@fpf/components/Text'

import { screenPadding } from '@fpf/common/styles/screenPadding'
import { screenSize } from '@fpf/common/styles/screenSizeHelper'

export const FormHeader = styled(Text)`
  font-size: 16px;
  text-align: center;
  margin-vertical: 32px;
`

export const FormHelper = styled(Text)`
  color: #9b9b9b;
  margin-bottom: 11px;
`
export const FieldWrapper = styled.View`
  margin-bottom: 11px;
`
export const FormFieldsWrapper = styled.View`
  padding-bottom: ${screenSize({ xs: 10, sm: 15 }, 30)}px;
`

export const Container = styled.ScrollView`
  ${screenPadding}
`
export const BottomPadding = styled.View`
  height: 80px;
`
