import styled from 'styled-components/native'

import { Text } from '@components/Text'

export const FieldLabel = styled(Text)`
  font-size: 14;
  color: #4a4a4a;
  padding-left: 20;
  ${({ bottomMargin }) => `margin-bottom: ${bottomMargin};`}
  margin-top: 20;
`

FieldLabel.defaultProps = {
  bottomMargin: 4
}
