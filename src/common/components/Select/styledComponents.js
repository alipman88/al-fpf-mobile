import styled from 'styled-components/native'

import { Text } from '@components/Text'

export const Container = styled.View``

export const SelectButton = styled.TouchableOpacity`
  border-radius: 5;
  border-width: 1;
  border-color: ${({ hasError }) => (hasError ? '#dc4558' : '#d5dde1')};
  background-color: ${({ hasError }) => (hasError ? '#ffebeb' : '#fff')};
  height: 40;
  justify-content: center;
  padding-horizontal: 4;
`

export const SelectPlaceholder = styled(Text)`
  font-size: 15;
  color: ${({ color }) => color};
`

export const DownArrowWrapper = styled.View`
  position: absolute;
  right: 5;
  top: 0;
  bottom: 0;
  justify-content: center;
`
