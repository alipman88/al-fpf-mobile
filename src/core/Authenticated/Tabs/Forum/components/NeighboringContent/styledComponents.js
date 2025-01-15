import styled from 'styled-components/native'
import { Text, TextSemibold } from '@fpf/components/Text'

export const SectionContainer = styled.View``

export const Card = styled.View`
  border-radius: 5px;
  background-color: #fff;
  padding-horizontal: 16px;
  padding-vertical: 30px;
  margin-bottom: 10px;
`

export const SectionHeader = styled(TextSemibold)`
  color: #355768;
  font-size: 18px;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 30px;
`

export const Divider = styled.View`
  height: 1px;
  background-color: #d0d1d7;
  width: 100%;
  margin-vertical: 20px;
`

export const NewsHeader = styled(TextSemibold)`
  color: #000000;
  font-size: 16px;
`

export const NewsBody = styled(Text)`
  font-size: 16px;
  color: #505050;
`

export const Link = styled(TextSemibold)`
  color: #d77400;
  text-decoration: underline;
  text-decoration-color: #d77400;
  margin-top: 10px;
`

export const Row = styled.View``
