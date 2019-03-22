import styled from 'styled-components/native'
import { screenPadding } from '@common/styles/screenPadding'

export const ScreenWrapper = styled.View`
  background-color: ${({ grey }) => (grey ? '#f2f2f2' : 'white')};
  flex: 1;
  justify-content: space-between;
`

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
`

export const ContentWrapper = styled.View`
  flex: 1;
  ${({ withPadding }) => (withPadding ? screenPadding : '')}
`

export const GrassContainer = styled.View`
  background-color: #e3eddd;
  height: ${({ height }) => height || '140'};
  width: 100%;
  z-index: 100;
`

export const Grass = styled.Image`
  top: -18;
  position: absolute;
  width: 100%;
`
