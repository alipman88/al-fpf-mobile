import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
`

export const FormContainer = styled.View`
  flex: 3;
`

export const FieldContainer = styled.View`
  margin-bottom: 14;
`

export const BottomContainer = styled.View`
  padding-top: 40;
`

export const BottomText = styled(Text)`
  color: #9b9b9b;
`

export const LinksContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`

export const ResetPasswordContainer = styled.View`
  padding-right: 8;
  border-right-width: 1;
  border-color: #9b9b9b;
`

export const TroubleLoggingInContainer = styled.View`
  padding-left: 8;
`

export const LogoContainer = styled.View`
  width: 170;
  flex: 1;
  padding-top: 10;
  align-self: center;
`

export const Logo = styled.Image`
  width: 100%;
`

export const Version = styled(Text)`
  text-align: center;
  margin-top: 10;
`
