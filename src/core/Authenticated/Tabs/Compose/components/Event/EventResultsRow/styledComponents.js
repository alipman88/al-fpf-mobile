import styled from 'styled-components/native'
import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-color: #d5dde1;
  flex-direction: row;
  padding: 15px 17px 15px 20px;
  min-height: 62px;
`

export const Label = styled(TextSemibold)`
  font-size: 16px;
  flex: 1;
`

export const Date = styled(Text)`
  font-size: 14px;
  color: #999cad;
  flex: 1;
`

export const RadioButtonCircle = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border-width: 1px;
  border-color: #d5dde1;
`

export const RadioButtonActive = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #90a780;
`

export const RowContent = styled.View`
  flex: 1;
`

export const RadioButtonContainer = styled.View`
  justify-content: center;
  margin-right: 10px;
`
