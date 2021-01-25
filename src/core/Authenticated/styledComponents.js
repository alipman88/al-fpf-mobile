import styled from 'styled-components/native'

export const Icon = styled.Image`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`

export const IconContainer = styled.TouchableOpacity`
  padding-horizontal: 20px;
  padding-vertical: 10px;
`
