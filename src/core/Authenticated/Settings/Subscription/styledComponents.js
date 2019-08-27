import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const PageWrapper = styled.View`
  margin-horizontal: 25;
  margin-bottom: 50;
`

export const Title = styled(Text)`
  color: black;
  font-weight: bold;
  font-size: 22;
  text-align: center;
  padding-vertical: 10;
`

export const Description = styled(Text)`
  color: black;
  font-size: 18;
  line-height: 26;
  padding-vertical: 10;
`

export const ButtonWrapper = styled.View`
  margin-bottom: 18;
`

export const ButtonHint = styled(Text)`
  margin-top: 4;
  font-size: 16;
  text-align: center;
`

export const HelpText = styled(Text)`
  margin-top: 4;
  margin-bottom: 4;
  font-size: 12;
  text-align: center;
`
