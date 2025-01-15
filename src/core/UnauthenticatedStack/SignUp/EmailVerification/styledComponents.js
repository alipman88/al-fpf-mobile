import styled from 'styled-components/native'
import { screenSize } from '@fpf/common/styles/screenSizeHelper'
import { Text, TextSemibold } from '@fpf/components/Text'

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
`

export const BottomContainer = styled.View`
  padding-top: 40px;
`

export const BirdContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px;
`

export const Bird = styled.Image``

export const SuccessMessage = styled(TextSemibold)`
  font-size: 14px;
  margin-bottom: 20px;
`

export const HelpMessage = styled(Text)`
  font-size: 13px;
  margin-bottom: ${screenSize({ sm: 15 }, 20)}px;
  color: #4a4a4a;
`
export const MessageContainer = styled.View`
  margin-vertical: ${screenSize({ sm: 20 }, 40)}px;
  padding-horizontal: 10px;
  flex: 1;
  justify-content: flex-start;
`

const linkStyles = `
  color: #d77400;
  text-decoration-line: underline;
`

export const TextLink = styled(Text)`
  ${linkStyles}
  font-size: 13px;
  padding-horizontal: 20px;
`

export const BoldTextLink = styled(TextSemibold)`
  ${linkStyles}
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`
