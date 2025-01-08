import styled from 'styled-components/native'
import { Text } from '@fpf/components/Text'

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
`

export const FormContainer = styled.View`
  flex: 3;
`

export const FieldContainer = styled.View`
  margin-bottom: 14px;
`

export const BottomContainer = styled.View`
  padding-top: 40px;
`

export const BottomText = styled(Text)`
  color: #9b9b9b;
`

export const LinksContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`

export const ResetPasswordContainer = styled.View`
  padding-right: 8px;
  border-right-width: 1px;
  border-color: #9b9b9b;
`

export const TroubleLoggingInContainer = styled.View`
  padding-left: 8px;
`

export const LogoContainer = styled.View`
  width: 170px;
  flex: 1;
  padding-top: 10px;
  align-self: center;
`

export const Logo = styled.Image`
  width: 100%;
`

export const Version = styled(Text)`
  text-align: center;
  margin-top: 10px;
`
export const ButtonSpacer = styled.View`
  height: 10px;
  width: 100%;
`
