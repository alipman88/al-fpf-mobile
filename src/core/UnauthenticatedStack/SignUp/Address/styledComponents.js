import styled from 'styled-components/native'

import { Text, TextSemibold } from '@fpf/components/Text'

export const Description = styled(Text)`
  font-size: 14px;
  color: #8d8d8d;
  margin-horizontal: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`

export const NoAreasContainer = styled.View`
  background-color: #e4f1d8;
  padding-horizontal: 30px;
  padding-vertical: 20px;
  margin-top: 20px;
`

export const NoAreasHeader = styled(TextSemibold)`
  font-size: 21px;
  color: #4b4b4b;
  margin-bottom: 10px;
  text-align: center;
`

export const NoAreasText = styled(Text)`
  color: #525a4d;
  font-size: 14px;
  text-align: center;
`
