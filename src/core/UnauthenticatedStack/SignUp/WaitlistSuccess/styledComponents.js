import styled from 'styled-components/native'
import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  justify-content: space-between;
  align-items: center;
  padding-top: 56px;
`

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
`

export const TextContainer = styled.View`
  padding-horizontal: 30px;
  margin-bottom: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const BodyText = styled(Text)`
  font-size: 16px;
  text-align: center;
`

export const Link = styled(TextSemibold)`
  color: #d77400;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`
