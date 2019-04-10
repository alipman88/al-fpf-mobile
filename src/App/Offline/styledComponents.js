import styled from 'styled-components/native'
import { Text, TextSemibold } from '@components/Text'

export const FullscreenContainer = styled.View`
  position: absolute;
  z-index: 500;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const OfflineHeader = styled(TextSemibold)`
  color: #355768;
  font-size: 24;
  text-align: center;
  margin-vertical: 20;
`

export const Body = styled(Text)`
  font-size: 16;
  text-align: center;
  margin-horizontal: 40;
`

export const Image = styled.Image``
