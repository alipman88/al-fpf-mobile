import styled from 'styled-components/native'

import { TextSemibold } from '@components/Text'

export const FieldHeading = styled(TextSemibold)`
  font-size: 18;
  color: #4a4a4a;
  padding-left: 20;
  ${({ bottomMargin }) => `margin-bottom: ${bottomMargin};`}
  margin-top: 20;
`

FieldHeading.defaultProps = {
  bottomMargin: 4,
}
