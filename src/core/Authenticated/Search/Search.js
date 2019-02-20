import React from 'react'
import { Text } from '@components/Text'
import { ScreenContainer } from '@components/ScreenContainer'

export class Search extends React.Component {
  static navigationOptions = {
    title: 'Search'
  }

  render() {
    return (
      <ScreenContainer grey>
        <Text>Search</Text>
      </ScreenContainer>
    )
  }
}
