import styled from 'styled-components/native'

import { TextSemibold } from '@components/Text'

export const ScreenWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`

export const NavButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  z-index: 100;
  padding-top: 20px;
  padding-horizontal: 25px;
`

export const Divider = styled.Image`
  position: absolute;
  bottom: -5px;
  width: 100%;
`

export const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding-top: ${({ topPadding }) => topPadding || 10}px;
  padding-bottom: 18px;
  z-index: 100;
`

export const TopHeader = styled(TextSemibold)`
  font-size: 20px;
  color: #355768;
  text-align: center;
`
