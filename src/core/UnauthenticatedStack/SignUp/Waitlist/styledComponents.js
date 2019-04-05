import styled from 'styled-components/native'

import { paddingHorizontal } from '@common/styles/screenPadding'
import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  padding-horizontal: ${paddingHorizontal};
  padding-bottom: 20;
`

export const SubTitle = styled(Text)`
  font-size: 15;
  color: #4a4a4a;
  text-align: center;
  padding-horizontal: 100;
`

export const FieldWrapper = styled.View`
  margin-bottom: 15;
  margin-top: 5;
`
export const Header = styled(TextSemibold)`
  color: #355768;
  font-size: 18;
  margin-bottom: 10;
  margin-top: 20;
  ${({ centered }) => centered && 'text-align: center;'}
`

export const Divider = styled.Image`
  position: absolute;
  bottom: -5;
  width: 100%;
`
export const DividerContainer = styled.View`
  z-index: 100;
  margin-vertical: 15;
`

export const TopContainer = styled.View`
  background-color: #fff;
  padding-bottom: 10;
  z-index: 100;
`
export const TrioBird = styled.Image`
  position: absolute;
  right: 30;
  bottom: -10;
`
