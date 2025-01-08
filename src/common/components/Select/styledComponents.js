import styled from 'styled-components/native'

import { Text } from '@fpf/components/Text'

export const Container = styled.View``

export const SelectButton = styled.TouchableOpacity`
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ hasError }) => (hasError ? '#dc4558' : '#d5dde1')};
  background-color: ${({ hasError }) => (hasError ? '#ffebeb' : '#fff')};
  height: 40px;
  justify-content: center;
  padding-horizontal: 4px;
`

export const SelectPlaceholder = styled(Text)`
  font-size: 15px;
  color: ${({ color }) => color};
`

export const DownArrowWrapper = styled.View`
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;
  justify-content: center;
`
