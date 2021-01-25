import styled from 'styled-components/native'

import { TextSemibold } from '@components/Text'

export const Container = styled.View`
  ${({ hasBorder }) => (hasBorder ? 'border-bottom-width: 1px;' : '')}
  border-color: #d0d1d7;
  ${({ hasLabel }) =>
    hasLabel ? 'padding-top: 12px; padding-bottom: 18px;' : 'padding-vertical: 18px;'}
  flex-direction: row;
  margin-horizontal: 20px;
  justify-content: space-between;
`

export const Text = styled(TextSemibold)`
  color: #1f66b9;
  font-size: 16px;
`
