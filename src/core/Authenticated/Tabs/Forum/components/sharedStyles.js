import styled from 'styled-components/native'

import { Text } from '@components/Text'

export const Card = styled.View`
  flex: 1;
  border-color: #ebecf1;
  border-width: 1;
  border-radius: 5;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 10;
`

export const Header = styled(Text)`
  font-size: 22;
  font-weight: bold;
  color: #355768;
  margin-bottom: 10;
`

export const CardContent = styled.View`
  padding: 16px;
`

export const ContentText = styled(Text)`
  font-size: 16;
  padding-top: 14px;
`

export const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0px 10px 13px 10px;
  align-items: stretch;
`
