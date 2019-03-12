import styled from 'styled-components/native'

import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View``

export const Divider = styled.View`
  height: 1;
  width: 100%;
  background-color: #d5dde1;
`

export const Header = styled(Text)`
  color: #355768;
  font-size: 15;
  padding-vertical: 15;
`

export const Link = styled(TextSemibold)`
  color: #d77400;
  font-size: 16;
  padding-vertical: 10;
`
