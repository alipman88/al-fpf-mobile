import styled from 'styled-components/native'

import { TextSemibold } from '@components/Text'

export const FieldHeading = styled(TextSemibold)`
  font-size: 18px;
  color: #4a4a4a;
  padding-left: 20px;
  ${({ bottomMargin }) => `margin-bottom: ${bottomMargin};`}
  margin-top: 20px;
`

FieldHeading.defaultProps = {
  bottomMargin: '4px',
}
