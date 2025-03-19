import styled from 'styled-components/native'

import { paddingHorizontal } from '@fpf/common/styles/screenPadding'
import { Text, TextSemibold } from '@fpf/components/Text'

export const Container = styled.View`
  padding-horizontal: ${paddingHorizontal}px;
  padding-bottom: 20px;
`

export const SubTitle = styled(Text)`
  font-size: 15px;
  color: #4a4a4a;
  text-align: center;
  padding-bottom: 10px;
  padding-horizontal: 20px;
`

export const FieldWrapper = styled.View`
  margin-bottom: 15px;
  margin-top: 5px;
`
export const Header = styled(TextSemibold)`
  color: #355768;
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 20px;
  ${({ centered }) => centered && 'text-align: center;'}
`

export const Divider = styled.Image`
  position: absolute;
  bottom: -5px;
  width: 100%;
`
export const DividerContainer = styled.View`
  z-index: 100;
  margin-vertical: 15px;
`

export const TopContainer = styled.View`
  background-color: #fff;
  padding-bottom: 10px;
  z-index: 100;
`
export const TrioBird = styled.Image`
  position: absolute;
  right: 30px;
  bottom: -10px;
`
