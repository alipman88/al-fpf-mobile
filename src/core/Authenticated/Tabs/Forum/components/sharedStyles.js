import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

import { Text } from '@components/Text'

export const Card = styled.View`
  flex: 1;
  border-color: #ebecf1;
  border-width: 1px;
  border-radius: 5px;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 10px;
`

export const Header = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: #355768;
  margin-bottom: 10px;
`

export const CardContent = styled.View`
  padding: 16px;
`

export const ContentText = styled(Text)`
  font-size: 16px;
  padding-top: 14px;
`

export const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0px 10px 13px 10px;
  align-items: stretch;
`

export const AutoPostLinkStyle = StyleSheet.create({
  link: {
    color: '#d77400',
  },
})

export const Disclaimer = styled(Text)`
  font-size: 16px;
  color: #6c757d;
  padding: 7px 14px;
`
