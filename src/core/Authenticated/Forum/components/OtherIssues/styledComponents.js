import styled from 'styled-components/native'
import { Text, TextSemibold } from '@components/Text'

export const IssueTextBold = styled(TextSemibold)`
  color: #fff;
`

export const IssueText = styled(Text)`
  color: rgba(255, 255, 255, 0.75);
`

export const IssueScrollView = styled.ScrollView`
  flex:1
  flex-direction: row;
  margin-bottom: 15;
`

export const IssueBox = styled.View`
  height: 53;
  width: 140;
  background-color: ${props =>
    props.focused ? '#97b57b' : 'rgba(151, 181, 123, 0.5)'};
  border-radius: 4;
  margin-right: 11px;
  align-items: center;
  justify-content: center;
`
export const Triangle = styled.View`
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-top-width: 7;
  border-right-width: 8;
  border-left-width: 8;
  border-bottom-width: 0;
  border-top-color: #97b57b;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  margin-left: 62;
`
