import styled from 'styled-components/native'

import { TextSemibold } from '@components/Text'

export const Container = styled.View``

export const Divider = styled.View`
  height: 1;
  width: 100%;
  background-color: #d5dde1;
`

export const Link = styled(TextSemibold)`
  color: #d77400;
  font-size: 16;
  padding-vertical: 10;
`

export const SearchHistoryText = styled(TextSemibold)`
  color: #355768;
  font-size: 15;
`

export const SearchHistoryToggle = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 19;
  margin-bottom: 7;
`
