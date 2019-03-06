import styled from 'styled-components/native'
import { Text, TextSemibold } from '@components/Text'

export const SectionContainer = styled.View``

export const Card = styled.View`
  border-radius: 5;
  background-color: #fff;
  padding-horizontal: 16;
  padding-vertical: 30;
`

export const SectionHeader = styled(TextSemibold)`
  color: #355768;
  font-size: 18;
  text-align: center;
  margin-vertical: 30;
`

export const Divider = styled.View`
  height: 1;
  background-color: #d0d1d7;
  width: 100%;
  margin-vertical: 20;
`

export const NewsHeader = styled(TextSemibold)`
  font-size: 16;
`

export const NewsBody = styled(Text)`
  font-size: 16;
  color: #505050;
`

export const Link = styled(TextSemibold)`
  color: #d77400;
  text-decoration: underline;
  text-decoration-color: #d77400;
  margin-top: 10;
`

export const Row = styled.View``
