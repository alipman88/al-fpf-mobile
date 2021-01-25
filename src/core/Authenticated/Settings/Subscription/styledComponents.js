import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const PageWrapper = styled.View`
  margin-horizontal: 25px;
  margin-bottom: 50px;
`

export const Title = styled(Text)`
  color: black;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  padding-vertical: 10px;
`

export const Description = styled(Text)`
  color: black;
  font-size: 18px;
  line-height: 26px;
  padding-vertical: 10px;
`

export const ButtonWrapper = styled.View`
  margin-bottom: 18px;
`

export const ButtonHint = styled(Text)`
  margin-top: 4px;
  font-size: 12px;
  text-align: center;
`

export const HelpText = styled(Text)`
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 12px;
  text-align: center;
`
