import styled from 'styled-components/native'

import { TextSemibold } from '@components/Text'

export const Container = styled.View`
  ${({ hasBorder }) => (hasBorder ? 'border-bottom-width: 1;' : '')}
  border-color: #d0d1d7;
  ${({ hasLabel }) =>
    hasLabel ? 'padding-top: 12; padding-bottom: 18;' : 'padding-vertical: 18;'}
  flex-direction: row;
  margin-horizontal: 20;
  justify-content: space-between;
`

export const Text = styled(TextSemibold)`
  color: #1f66b9;
  font-size: 16;
`
