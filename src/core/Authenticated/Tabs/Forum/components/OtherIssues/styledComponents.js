import styled from 'styled-components/native'
import { Text, TextSemibold } from '@fpf/components/Text'

export const IssueTextBold = styled(TextSemibold)`
  color: #fff;
`

export const IssueText = styled(Text)`
  color: rgba(255, 255, 255, 0.75);
`

export const IssueScrollView = styled.ScrollView`
  flex: 1;
  flex-direction: row;
  margin-bottom: 10px;
`

export const IssueBox = styled.View`
  height: 53px;
  width: 140px;
  background-color: ${({ focused }) =>
    focused ? '#97b57b' : 'rgba(151, 181, 123, 0.5)'};
  border-radius: 4px;
  margin-horizontal: 11px;
  margin-top: ${({ isUnread }) => (isUnread ? '0' : '12')}px;
  align-items: center;
  justify-content: center;
`
export const Triangle = styled.View`
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-top-width: 7px;
  border-right-width: 8px;
  border-left-width: 8px;
  border-bottom-width: 0;
  border-top-color: #97b57b;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  margin-left: 72px;
`

export const UnreadMarker = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 50px;
  background-color: ${({ focused }) => (focused ? '#d00207' : '#e8acb3')};
  align-self: flex-end;
  right: 7px;
  top: 8px;
  z-index: 10;
`
