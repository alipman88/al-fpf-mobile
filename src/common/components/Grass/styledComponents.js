import styled from 'styled-components/native'

export const GrassContainer = styled.View`
  background-color: #e3eddd;
  height: ${({ height }) => height || '140'};
  width: 100%;
  z-index: 100;
`

export const GrassBorder = styled.Image`
  top: -18;
  position: absolute;
  width: 100%;
`
