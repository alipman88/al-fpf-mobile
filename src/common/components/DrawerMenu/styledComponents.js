import styled from 'styled-components/native'

import { TextSemibold, Text } from '@fpf/components/Text'

export const View = styled.View`
  flex: 1;
  background-color: #fff;
`

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`

export const Container = styled.View`
  padding: 30px 27px 0 15px;
  flex: 1;
`

export const Header = styled(TextSemibold)`
  color: #355768;
  font-size: 18px;
  padding-left: 7px;
  margin-bottom: 10px;
`

export const ForumText = styled(Text)`
  color: #6b6e7d;
  font-size: 16px;
  padding: 7px;
  background-color: ${({ active }) => (active ? '#fff4e7' : '#fff')};
  font-weight: ${({ access }) => (access === 'primary' ? 'bold' : 'normal')};
`

export const Birds = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding-horizontal: 5px;
`
