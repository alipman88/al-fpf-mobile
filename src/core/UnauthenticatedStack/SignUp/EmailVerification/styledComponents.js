import styled from 'styled-components/native'
import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
`

export const BottomContainer = styled.View`
  padding-top: 40;
`

export const BirdContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20;
`

export const Bird = styled.Image``

export const SuccessMessage = styled(TextSemibold)`
  font-size: 14;
  margin-bottom: 20;
`

export const HelpMessage = styled(Text)`
  font-size: 13;
  margin-bottom: 20;
  color: #4a4a4a;
`
export const MessageContainer = styled.View`
  margin-vertical: 40;
  padding-horizontal: 10;
  flex: 1;
  justify-content: flex-start;
`

const linkStyles = `
  color: #d77400;
  text-decoration-line: underline;
`

export const TextLink = styled(Text)`
  ${linkStyles}
  font-size: 13;
  padding-horizontal: 20;
`

export const BoldTextLink = styled(TextSemibold)`
  ${linkStyles}
  font-size: 14;
  text-align: center;
  margin-top: 20;
`
