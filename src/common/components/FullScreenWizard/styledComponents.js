import styled from 'styled-components/native'

import { TextSemibold } from '@components/Text'

export const LogoContainer = styled.View`
  align-items: center;
`

export const Logo = styled.Image`
  width: 175;
`
export const NavButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  z-index: 100;
  padding-top: 20;
  padding-horizontal: 25;
`

export const Divider = styled.Image`
  position: absolute;
  bottom: -5;
  width: 100%;
`

export const TopContainer = styled.View`
  background-color: #fff;
  padding-top: 25;
  padding-bottom: 18;
  z-index: 100;
`

export const TopHeader = styled(TextSemibold)`
  font-size: 20;
  color: #355768;
  text-align: center;
`
