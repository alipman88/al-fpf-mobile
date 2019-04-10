import React from 'react'
import firebase from 'react-native-firebase'
import { AppState, Linking } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen'
import NetInfo from '@react-native-community/netinfo'

import { store, persistor } from '@common/store'
import { currentUser } from '@common/currentUser'
import { AppMessage } from '@components/AppMessage'
import { parseDeepLink } from '@common/utils/parseDeepLink'
import navigationService from '@common/utils/navigationService'
import { Container } from './Container'
import { Offline } from './Offline'

export class App extends React.Component {
  state = {
    appState: AppState.currentState,
    connected: true
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL)
    AppState.addEventListener('change', this.handleAppStateChange)
    SplashScreen.hide()
    NetInfo.addEventListener('connectionChange', connectionInfo => {
      this.setConnectedStatus(connectionInfo.type, connectionInfo.effectiveType)
    })

    NetInfo.getConnectionInfo().then(connectionInfo => {
      this.setConnectedStatus(connectionInfo.type, connectionInfo.effectiveType)
    })
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      await firebase.notifications().setBadge(0)
    }

    this.setState({ appState: nextAppState })
  }

  handleOpenURL = event => {
    if (currentUser.selectors.getAccessToken(store.getState())) {
      const { route, params } = parseDeepLink(event.url)
      navigationService.navigate(route, params)
    }
  }

  setConnectedStatus(type, effectiveType) {
    const connectionWeak =
      type === 'none' ||
      type === 'unknown' ||
      (type !== 'wifi' && effectiveType === '2g')

    this.setState({ connected: !connectionWeak })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <Container />
            {!this.state.connected && <Offline />}
            <AppMessage />
          </React.Fragment>
        </PersistGate>
      </Provider>
    )
  }
}
