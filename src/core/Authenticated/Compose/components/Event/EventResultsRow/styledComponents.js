import styled from 'styled-components/native'
import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  flex: 1;
  border-bottom-width: 1;
  border-color: #d5dde1;
  flex-direction: row;
  padding: 15px 17px 15px 20px;
  min-height: 62;
`

export const Label = styled(TextSemibold)`
  font-size: 16;
  flex: 1;
`

export const Date = styled(Text)`
  font-size: 14;
  color: #999cad;
  flex: 1;
`

export const RadioButtonCircle = styled.View`
  width: 22;
  height: 22;
  border-radius: 11;
  border-width: 1;
  border-color: #d5dde1;
`

export const RadioButtonActive = styled.View`
  width: 12;
  height: 12;
  border-radius: 6;
  position: absolute;
  top: 4;
  left: 4;
  background-color: #90a780;
`

export const RowContent = styled.View`
  flex: 1;
`

export const RadioButtonContainer = styled.View`
  justify-content: center;
  margin-right: 10;
`
