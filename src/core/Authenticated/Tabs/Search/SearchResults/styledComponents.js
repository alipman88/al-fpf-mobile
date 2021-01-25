import styled from 'styled-components/native'

import { TextSemibold } from '@components/Text'

export const ResultsContainer = styled.View`
  flex: 1;
  background-color: white;
  align-self: stretch;
`

export const ResultCounts = styled(TextSemibold)`
  color: #999cad;
  font-size: 16px;
  text-align: center;
  flex: 1;
  margin-top: 23px;
  margin-bottom: 12px;
`

export const ResultsDivider = styled.View`
  height: 1px;
  background-color: #d0d1d7;
  width: 100%;
  margin-bottom: 18px;
`
export const LoadMoreContainer = styled.View`
  padding-bottom: 10px;
`
