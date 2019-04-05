import styled from 'styled-components/native'

import { Text, TextSemibold } from '@components/Text'

export const Description = styled(Text)`
  font-size: 14;
  color: #8d8d8d;
  margin-horizontal: 20;
  margin-top: 30;
  margin-bottom: 30;
  text-align: center;
`

export const FieldWrapper = styled.View`
  margin-bottom: 4;
`

export const NoAreasContainer = styled.View`
  background-color: #e4f1d8;
  padding-horizontal: 30;
  padding-vertical: 20;
  margin-top: 20;
`

export const NoAreasHeader = styled(TextSemibold)`
  font-size: 21;
  color: #4b4b4b;
  margin-bottom: 10;
  text-align: center;
`

export const NoAreasText = styled(Text)`
  color: #525a4d;
  font-size: 14;
  text-align: center;
`
