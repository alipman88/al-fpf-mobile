import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { Text } from '@components/Text'

export const OcmMessageText = styled(Text)`
  font-size: 18;
  padding-horizontal: 25;
  padding-top: 20;
  padding-bottom: 30;
  text-align: center;
  color: #355768;
`

export const AutoPostLinkStyle = StyleSheet.create({
  link: {
    color: '#d77400'
  }
})
