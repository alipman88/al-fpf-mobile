import React from 'react'
import { Select } from '@fpf/components/Select'
import { TextInput } from '@fpf/components/TextInput'
import {
  Container,
  Label,
  WebColors,
} from '@fpf/components/WebView/styledComponents'

export class ComposePlaceholder extends React.Component {
  render() {
    return (
      <Container
        style={{
          flex: 0,
          height: '100%',
          paddingTop: 24,
          backgroundColor: WebColors.gray100,
        }}
      >
        <Label>Select posting category that best applies:</Label>
        <Select
          items={[]}
          placeholder='Selection required'
          placeholderStyle={{ color: WebColors.gray800, fontSize: 16 }}
          style={{ marginBottom: 20, borderRadius: 0 }}
          onValueChange={() => {}}
        />
        <Label>Subject</Label>
        <TextInput style={{ marginBottom: 20 }} />
        <Label>Body</Label>
        <TextInput style={{ height: 264, marginBottom: 20 }} />
      </Container>
    )
  }
}
