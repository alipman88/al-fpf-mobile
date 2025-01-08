import styled from 'styled-components/native'

import { Text } from '@fpf/components/Text'

export const FieldLabel = styled(Text)`
  font-size: 14px;
  color: #4a4a4a;
  padding-left: 20px;
  ${({ bottomMargin }) => `margin-bottom: ${bottomMargin};`}
  margin-top: 20px;
`

FieldLabel.defaultProps = {
  bottomMargin: '4px',
}
