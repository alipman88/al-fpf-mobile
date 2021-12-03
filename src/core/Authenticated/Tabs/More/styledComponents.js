import styled from 'styled-components/native'
import { Text } from '@components/Text'

const iconSize = 80

export const PageWrapper = styled.View`
  margin-horizontal: 25px;
  margin-bottom: 50px;
`

export const PageHeader = styled(Text)`
  color: black;
  font-size: 22px;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 20px;
  margin-horizontal: 20px;
`

export const Card = styled.View`
  border-color: #ebecf1;
  border-width: 1px;
  border-radius: 5px;
  flex-direction: column;
  background-color: #fff;
  margin-top: ${iconSize / 2 + 20}px;
  padding-horizontal: 30px;
  padding-bottom: 20px;
`

export const CenterImgContainer = styled.View`
  justify-content: center;
  align-items: center;
`

export const CardIcon = styled.Image`
  height: ${iconSize}px;
  width: ${iconSize}px;
  justify-content: center;
  resize-mode: contain;
  position: absolute;
  top: ${0 - iconSize / 2}px;
`

export const CardTitle = styled(Text)`
  color: black;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  padding-vertical: 10px;
  margin-top: ${iconSize / 2 + 5}px;
`

export const CardContent = styled(Text)`
  color: black;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  padding-vertical: 10px;
`

export const CopyrightText = styled(Text)`
  color: black;
  font-size: 12px;
  text-align: center;
  padding-vertical: 10px;
`

export const FooterLinkWrapper = styled.View`
  margin-top: 40px;
`

export const FooterLink = styled.View`
  border-top-color: #333;
  border-top-width: 1px;
  padding-vertical: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const FooterText = styled(Text)`
  font-size: 18px;
  width: 100%;
`

export const RightIcon = styled.Image`
  height: 18px;
  width: 18px;
  margin-left: -18px;
`
