import styled from 'styled-components/native'
import { Text } from '@components/Text'

const iconSize = 80

export const PageWrapper = styled.View`
  margin-horizontal: 25;
  margin-bottom: 50;
`

export const PageHeader = styled(Text)`
  color: black;
  font-size: 22;
  text-align: center;
  padding-top: 40;
  padding-bottom: 20;
  margin-horizontal: 20;
`

export const Card = styled.View`
  border-color: #ebecf1;
  border-width: 1;
  border-radius: 5;
  flex-direction: column;
  background-color: #fff;
  margin-top: ${iconSize / 2 + 20};
  padding-horizontal: 30;
  padding-bottom: 20;
`

export const CenterImgContainer = styled.View`
  justify-content: center;
  align-items: center;
`

export const CardIcon = styled.Image`
  height: ${iconSize};
  width: ${iconSize};
  justify-content: center;
  text-align: center;
  resize-mode: contain;
  position: absolute;
  top: ${0 - iconSize / 2};
`

export const CardTitle = styled(Text)`
  color: black;
  font-weight: bold;
  font-size: 22;
  text-align: center;
  padding-vertical: 10;
  margin-top: ${iconSize / 2 + 5};
`

export const CardContent = styled(Text)`
  color: black;
  font-size: 18;
  line-height: 26;
  text-align: center;
  padding-vertical: 10;
`

export const FooterLinkWrapper = styled.View`
  margin-top: 40;
`

export const FooterLink = styled.View`
  border-top-color: #333;
  border-top-width: 1px;
  padding-vertical: 15;
  flex-direction: row;
  justify-content: space-between;
`

export const FooterText = styled(Text)`
  font-size: 18;
`

export const RightIcon = styled.Image`
  height: 18;
  width: 18;
`
