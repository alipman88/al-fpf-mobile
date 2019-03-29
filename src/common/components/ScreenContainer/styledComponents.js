import styled from 'styled-components/native'
import { screenPadding } from '@common/styles/screenPadding'

export const ScreenWrapper = styled.View`
  background-color: ${({ grey }) => (grey ? '#f5f6f9' : 'white')};
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
