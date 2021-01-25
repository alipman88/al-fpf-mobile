import styled from 'styled-components/native'
import { Pill } from '@components/Pill'
import { Text, TextSemibold } from '@components/Text'

export const ProfileTypeContainer = styled.View`
  padding: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const ProfileTypePill = styled(Pill)`
  background-color: #fff;
  border-color: ${({ active }) => (active ? '#f29426' : '#869ba5')};
  border-width: 2px;
  margin-bottom: 7px;
  margin-top: 16px;
  padding-vertical: 14px;
  width: 225px;
  min-height: 45px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const PillText = styled(TextSemibold)`
  font-size: 18px;
  color: ${({ active }) => (active ? '#000' : '#869ba5')};
`

export const ProfileTypeText = styled(Text)`
  max-width: 225px;
  text-align: center;
  font-size: ${({ isHeader }) => (isHeader ? 25 : 16)}px;
  margin-bottom: ${({ extraMargin }) => (extraMargin ? 25 : 0)}px;
`
export const CheckBox = styled.Image`
  tint-color: #000;
`
