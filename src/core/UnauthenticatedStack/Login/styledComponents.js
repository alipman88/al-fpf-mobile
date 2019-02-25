import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const Container = styled.View`
  justify-content: space-between;
  flex: 1;
`

export const FormContainer = styled.View`
  flex: 2;
`

export const FieldContainer = styled.View`
  margin-bottom: 14;
`

export const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: 20;
`

export const ResetPassword = styled.Text`
  color: #9b9b9b;
  text-align: center;
  margin-top: 19;
`

export const LogoContainer = styled.View`
  flex: 1;
  padding-horizontal: 50;
  padding-top: 10;
  align-items: center;
`

export const Logo = styled.Image`
  width: 100%;
`

export const Version = styled(Text)`
  position: absolute;
  left: 0;
  bottom: 0;
`
