import styled from 'styled-components/native'
import { Text } from '@fpf/components/Text'

export const FormFieldLabel = styled(Text)`
  font-size: 15px;
  font-weight: bold;
`

export const FormFieldRequired = styled(Text)`
  font-size: 15px;
  font-weight: normal;
  color: #9b9b9b;
`
export const FormFieldLabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`
