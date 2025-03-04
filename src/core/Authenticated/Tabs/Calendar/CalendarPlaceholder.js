import React from 'react'
import { View } from 'react-native'

import {
  Title,
  Container,
  H3,
  Card,
  WebColors,
} from '@fpf/components/WebView/styledComponents'

export class CalendarPlaceholder extends React.Component {
  render() {
    return (
      <View style={{ flex: 0, height: '100%' }}>
        <Container style={{ height: 186, backgroundColor: WebColors.gray190 }}>
          <Title>Community Calendar</Title>
        </Container>
        <Container
          style={{ paddingTop: 84, backgroundColor: WebColors.gray100 }}
        >
          <H3>Sunday</H3>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <H3>Monday</H3>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <H3>Tuesday</H3>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <H3>Wednesday</H3>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <H3>Thursday</H3>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <H3>Friday</H3>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <H3>Saturday</H3>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
          <Card style={{ backgroundColor: WebColors.gray200 }}></Card>
        </Container>
      </View>
    )
  }
}
