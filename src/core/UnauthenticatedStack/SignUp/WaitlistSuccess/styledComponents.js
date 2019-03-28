import styled from 'styled-components/native'
import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  justify-content: space-between;
  align-items: center;
  padding-top: 56;
`

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: 20;
  right: 20;
`

export const TextContainer = styled.View`
  padding-horizontal: 30;
  margin-bottom: 30;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const BodyText = styled(Text)`
  font-size: 16;
  text-align: center;
`

export const Link = styled(TextSemibold)`
  color: #d77400;
  align-items: center;
  justify-content: center;
  font-size: 16;
`
