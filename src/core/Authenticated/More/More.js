import React from 'react'
import { Text } from '@components/Text'
import { ScreenContainer } from '@components/ScreenContainer'

export class More extends React.Component {
  static navigationOptions = {
    title: 'More'
  }

  render() {
    return (
      <ScreenContainer grey>
        <Text>More</Text>
      </ScreenContainer>
    )
  }
}
