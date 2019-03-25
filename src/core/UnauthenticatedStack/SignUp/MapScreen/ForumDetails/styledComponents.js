import styled from 'styled-components/native'

import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  background-color: #fff;
  border-radius: 5;
  flex: 1;
  min-width: 244;
  margin-right: 14;
`

export const Contents = styled.View`
  padding: 12px 12px;
`

export const Header = styled(TextSemibold)`
  font-size: 18;
  color: #4a4a4a;
  margin-bottom: 11;
`

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5;
`

export const Label = styled(Text)`
  font-size: 14;
  color: #000;
`

export const Value = styled(Text)`
  font-size: 14;
  color: #6b6e7d;
  text-align: right;
`

export const JoinContainer = styled.View`
  padding: 12px 12px;
  background-color: #f5f6f9;
  border-bottom-left-radius: 5;
  border-bottom-right-radius: 5;
  justify-content: space-between;
  flex-direction: row;
`

export const JoinText = styled(TextSemibold)`
  font-size: 14;
  color: #4a4a4a;
`
