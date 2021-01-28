import React from 'react'
import analytics from '@react-native-firebase/analytics'
import { AppState, Linking, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen'
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-easy-toast'
import RNIap from 'react-native-iap'

import { Config } from '@common/config'
import { store, persistor } from '@common/store'
import { currentUser } from '@common/currentUser'
import { AppMessage } from '@components/AppMessage'
import { parseDeepLink } from '@common/utils/parseDeepLink'
import navigationService from '@common/utils/navigationService'
import { getProducts } from '@common/products'
import { Container } from './Container'
import { Offline } from './Offline'
import { purchaseUpdated, purchaseError } from '@common/purchases'
import { sendDeviceData } from '@common/session'
import { getProfiles } from '@common/profile'
import { subscriptionSkus } from '@common/types/subscriptionSkus'
import { setApplicationIconBadgeNumber } from '@common/notifications'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.toastRef = React.createRef()
  }

  state = {
    appState: AppState.currentState,
    connected: true,
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL)
    AppState.addEventListener('change', this.handleAppStateChange)
    SplashScreen.hide()
    this.netInfoUnsubscribe = NetInfo.addEventListener(this.setConnectedStatus)

    this.updateConnectionStatus()

    // Remove this guard when adding support for Google Play [#168313664]
    if (Platform.OS === 'ios') {
      store.dispatch(getProducts(subscriptionSkus))
      this.purchaseUpdatedListener = RNIap.purchaseUpdatedListener(
        (purchase) => {
          store.dispatch(purchaseUpdated(purchase))
        }
      )
      this.purchaseErrorListener = RNIap.purchaseErrorListener((error) => {
        store.dispatch(purchaseError(error))
      })
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
    AppState.removeEventListener('change', this.handleAppStateChange)
    if (this.netInfoUnsubscribe) {
      this.netInfoUnsubscribe()
      this.netInfoUnsubscribe = null
    }

    if (this.purchaseUpdatedListener) {
      this.purchaseUpdatedListener.remove()
      this.purchaseUpdatedListener = null
    }
    if (this.purchaseErrorListener) {
      this.purchaseErrorListener.remove()
      this.purchaseErrorListener = null
    }
  }

  updateConnectionStatus = () => {
    const startConnectionState = this.state.connected
    NetInfo.fetch().then(async (state) => {
      const connected = await this.setConnectedStatus(state)

      if (!startConnectionState && !connected && this.toastRef.current) {
        this.toastRef.current.show('No cell or wifi signal')
      }
    })
  }

  handleAppStateChange = async (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background|unknown/) &&
      nextAppState === 'active'
    ) {
      store.dispatch(sendDeviceData())
      store.dispatch(getProfiles())
      setApplicationIconBadgeNumber(0)
    }

    this.setState({ appState: nextAppState })
  }

  handleOpenURL = (event) => {
    if (currentUser.selectors.getAccessToken(store.getState())) {
      const { route, params } = parseDeepLink(event.url)
      navigationService.navigate(route, params)
    }
  }

  getActiveRouteName = (navigationState) => {
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
      analytics().logScreenView({ screen_name: currentScreen })
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
          <SafeAreaProvider>
            <React.Fragment>
              <Container handleNavigationChange={this.handleNavigationChange} />
              {!this.state.connected && (
                <Offline updateConnectionStatus={this.updateConnectionStatus} />
              )}
              <AppMessage />
              <Toast
                ref={this.toastRef}
                position='top'
                style={{ zIndex: 1000 }}
              />
            </React.Fragment>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    )
  }
}
