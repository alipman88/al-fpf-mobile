import React from 'react'
import firebase from 'react-native-firebase'
import { AppState, Linking } from 'react-native'
import Config from 'react-native-config'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen'
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-easy-toast'

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
    NetInfo.addEventListener('connectionChange', this.setConnectedStatus)

    this.updateConnectionStatus()
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
    AppState.removeEventListener('connectionChange', this.handleAppStateChange)
    NetInfo.removeEventListener('connectionChange', this.setConnectedStatus)
  }

  updateConnectionStatus = () => {
    const startConnectionState = this.state.connected
    NetInfo.getConnectionInfo().then(async connectionInfo => {
      const connected = await this.setConnectedStatus(connectionInfo)

      if (!startConnectionState && !connected) {
        this.toastRef.show('No cell or wifi signal')
      }
    })
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

  getActiveRouteName = navigationState => {
    if (!navigationState) {
      return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRouteName(route)
    }
    return route.routeName
  }

  handleNavigationChange = (prevState, currentState, action) => {
    const currentScreen = this.getActiveRouteName(currentState)
    const prevScreen = this.getActiveRouteName(prevState)

    if (prevScreen !== currentScreen) {
      // trigger setting screen name for analytics based on react navigation
      firebase.analytics().setCurrentScreen(currentScreen)
    }
  }

  setConnectedStatus = async ({ type, effectiveType }) => {
    let connectionWeak =
      type === 'none' ||
      type === 'unknown' ||
      (type !== 'wifi' && effectiveType === '2g')

    // some cases where both values are unknown, lets see if we can reach the server
    if (connectionWeak && type === 'unknown' && effectiveType === 'unknown') {
      try {
        await fetch(`${Config.WEBSITE_HOST}/_health_check`)
        connectionWeak = false
      } catch {} // we ignore the exception, because if the request failed, connectionWeak is already covering us
    }

    this.setState({ connected: !connectionWeak })

    return !connectionWeak
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <Container handleNavigationChange={this.handleNavigationChange} />
            {!this.state.connected && (
              <Offline updateConnectionStatus={this.updateConnectionStatus} />
            )}
            <AppMessage />
            <Toast
              ref={toast => (this.toastRef = toast)}
              position='top'
              style={{ zIndex: 1000 }}
            />
          </React.Fragment>
        </PersistGate>
      </Provider>
    )
  }
}
