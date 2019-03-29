import styled from 'styled-components/native'

import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`

export const Navigation = styled.View``

export const LogoutText = styled(Text)`
  color: #4a4a4a;
  font-size: 16;
  text-decoration: underline;
  text-align: center;
  padding-bottom: 26;
`

export const ViewPostingsContainer = styled.View`
  border-top-width: 1;
  border-bottom-width: 1;
  border-color: #d0d1d7;
  padding-vertical: 18;
  flex-direction: row;
  margin-horizontal: 20;
  margin-top: 30;
  justify-content: space-between;
`

export const ViewPostings = styled(TextSemibold)`
  color: #1f66b9;
`

export const Version = styled(Text)`
  font-size: 14;
  margin-left: 20;
  margin-top: 16;
`
