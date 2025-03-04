import React from 'react'
import { View } from 'react-native'

import {
  Title,
  Container,
  Card,
  WebColors,
} from '@fpf/components/WebView/styledComponents'

export class SearchPlaceholder extends React.Component {
  render() {
    return (
      <View style={{ flex: 0, height: '100%' }}>
        <Container style={{ height: 376, backgroundColor: WebColors.gray190 }}>
          <Title>Search</Title>
          <Card
            style={{
              height: 34,
              marginTop: 12,
              borderWidth: 1,
              borderColor: WebColors.green,
            }}
          />
        </Container>
        <Container />
      </View>
    )
  }
}
