import React from 'react'
import { View } from 'react-native'

import {
  Title,
  Container,
  H3,
  Card,
  WebColors,
} from '@fpf/components/WebView/styledComponents'

export class DirectoryPlaceholder extends React.Component {
  render() {
    return (
      <View style={{ flex: 0, height: '100%' }}>
        <Container
          style={{
            height: 252,
            paddingTop: 68,
            backgroundColor: WebColors.gray190,
          }}
        >
          <Title>Business Directory</Title>
        </Container>
        <Container
          style={{ paddingTop: 44, backgroundColor: WebColors.gray100 }}
        >
          <H3 style={{ paddingBottom: 8, color: WebColors.blue600 }}>
            A Sampling of Featured Listings
          </H3>
          <Card style={{ height: 266 }}></Card>
          <H3
            style={{
              paddingTop: 32,
              paddingBottom: 8,
              color: WebColors.blue600,
            }}
          >
            What are you looking for today?
          </H3>
          <Card style={{ height: 266 }}></Card>
        </Container>
      </View>
    )
  }
}
