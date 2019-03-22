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
  border-width: 2;
  margin-bottom: 7;
  margin-top: 16;
  padding-vertical: 14;
  width: 225;
  min-height: 45;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const PillText = styled(TextSemibold)`
  font-size: 18;
  color: ${({ active }) => (active ? '#000' : '#869ba5')};
`

export const ProfileTypeText = styled(Text)`
  max-width: 225;
  text-align: center;
  font-size: ${({ isHeader }) => (isHeader ? 25 : 16)};
  margin-bottom: ${({ extraMargin }) => (extraMargin ? 25 : 0)};
`
export const CheckBox = styled.Image`
  tint-color: #000;
`
