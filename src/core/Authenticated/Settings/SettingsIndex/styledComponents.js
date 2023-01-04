import styled from 'styled-components/native'

import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`

export const Navigation = styled.View``

export const LogoutText = styled(Text)`
  color: #4a4a4a;
  font-size: 16px;
  text-decoration: underline;
  text-align: center;
  padding-bottom: 26px;
`

export const ExternalLinkContainer = styled.View`
  border-bottom-width: 1px;
  border-color: #d0d1d7;
  padding-vertical: 6px;
  flex-direction: row;
  margin-horizontal: 20px;
  justify-content: space-between;
`

export const ViewPostings = styled(TextSemibold)`
  color: #1f66b9;
`

export const Version = styled(Text)`
  font-size: 14px;
  margin-left: 20px;
  margin-top: 16px;
`
