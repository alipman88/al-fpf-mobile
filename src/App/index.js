import React from 'react'
import { Text } from 'react-native'
import Config from 'react-native-config'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '@common/store'

import { Container } from './styledComponents'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <Text>Hi</Text>
            <Text>{Config.API_HOST}</Text>
          </Container>
        </PersistGate>
      </Provider>
    )
  }
}
