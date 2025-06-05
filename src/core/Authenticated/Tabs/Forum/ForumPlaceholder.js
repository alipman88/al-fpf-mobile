import React from 'react'
import { View } from 'react-native'

import {
  Title,
  Container,
  H3,
  Card,
  WebColors,
} from '@fpf/components/WebView/styledComponents'

export class ForumPlaceholder extends React.Component {
  render() {
    return (
      <View style={{ flex: 0, height: '100%' }}>
        <Container style={{ height: 117, backgroundColor: WebColors.gray190 }}>
          <Title>Forum</Title>
        </Container>
        <Container
          style={{ paddingTop: 90, backgroundColor: WebColors.gray100 }}
        >
          <Card style={{ height: 200, paddingTop: 15, paddingLeft: 21 }}>
            <H3 style={{ color: WebColors.blue600 }}>In This Issue</H3>
          </Card>
          <Card style={{ height: 180 }}></Card>
          <Card style={{ height: 180 }}></Card>
          <Card style={{ height: 180 }}></Card>
        </Container>
      </View>
    )
  }
}
