import styled from 'styled-components/native'
import { screenPadding } from '@common/styles/screenPadding'

export const ScreenWrapper = styled.View`
  background-color: ${({ grey }) => (grey ? '#f2f2f2' : 'white')};
  flex: 1;
`

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
`

export const ContentWrapper = styled.View`
  flex: 1;
  ${({ withPadding }) => (withPadding ? screenPadding : '')}
`

export const GrassContainer = styled.View`
  background-color: #fff;
  padding-top: 20;
  height: 200;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

// Height of this is the height of this container subtract the container's top padding
export const GrassBg = styled.View`
  background-color: #e3eddd;
  height: 180;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Grass = styled.Image`
  top: 0;
  position: absolute;
  width: 100%;
`
