import styled from 'styled-components/native'
import { screenSize } from '@fpf/common/styles/screenSizeHelper'

export const GrassContainer = styled.View`
  background-color: #e3eddd;
  height: ${({ height }) => height || screenSize({ sm: 90 }, 140)}px;
  width: 100%;
`

export const GrassBorder = styled.Image`
  top: -18px;
  position: absolute;
  width: 100%;
`
