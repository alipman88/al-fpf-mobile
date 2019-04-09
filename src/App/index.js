import React from 'react'
import { Linking } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen'

import { store, persistor } from '@common/store'
import { currentUser } from '@common/currentUser'
import { AppMessage } from '@components/AppMessage'
import { parseDeepLink } from '@common/utils/parseDeepLink'
import navigationService from '@common/utils/navigationService'
import { Container } from './Container'

export class App extends React.Component {
  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL)
    SplashScreen.hide()
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL = event => {
    if (currentUser.selectors.getAccessToken(store.getState())) {
      const { route, params } = parseDeepLink(event.url)
      navigationService.navigate(route, params)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <Container />
            <AppMessage />
          </React.Fragment>
        </PersistGate>
      </Provider>
    )
  }
}
