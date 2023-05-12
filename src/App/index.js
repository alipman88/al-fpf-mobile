import React from 'react'
import analytics from '@react-native-firebase/analytics'
import { AppState, Platform } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-easy-toast'
import * as RNIap from 'react-native-iap'
import SplashScreen from 'react-native-splash-screen'

import { Config } from '@common/config'
import { store, persistor } from '@common/store'
import { currentUser } from '@common/currentUser'
import { AppMessage } from '@components/AppMessage'
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
    this.appStateListener = AppState.addEventListener(
      'change',
      this.handleAppStateChange
    )
    this.netInfoUnsubscribe = NetInfo.addEventListener(this.setConnectedStatus)

    this.updateConnectionStatus()

    // Remove this guard when adding support for Google Play [#168313664]
    if (Platform.OS === 'ios') {
      store.dispatch(getProducts(subscriptionSkus))
      RNIap.initConnection().then(() => {
        this.purchaseUpdatedListener = RNIap.purchaseUpdatedListener(
          (purchase) => {
            store.dispatch(purchaseUpdated(purchase))
          }
        )
        this.purchaseErrorListener = RNIap.purchaseErrorListener((error) => {
          store.dispatch(purchaseError(error))
        })
      })
    }

    // Hide the splash screen on app load
    SplashScreen.hide()
  }

  componentWillUnmount() {
    this.appStateListener?.remove()

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
      setApplicationIconBadgeNumber(0)

      if (currentUser.selectors.getAccessToken(store.getState())) {
        store.dispatch(sendDeviceData())
        store.dispatch(getProfiles())
      }
    }

    this.setState({ appState: nextAppState })
  }

  handleNavigationChange = (currentRouteName) => {
    analytics().logScreenView({ screen_name: currentRouteName })
  }

  setConnectedStatus = async ({ type, effectiveType }) => {
    let connectionWeak =
      type === 'none' ||
      type === 'unknown' ||
      (type !== 'wifi' && effectiveType === '2g')

    // React's NetInfo is unreliable. Double-check before alerting user of weak connection.
    if (connectionWeak) {
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
            <SafeAreaView style={{ flex: 1 }}>
              <React.Fragment>
                <Container
                  handleNavigationChange={this.handleNavigationChange}
                />
                {!this.state.connected && (
                  <Offline
                    updateConnectionStatus={this.updateConnectionStatus}
                  />
                )}
                <AppMessage />
                <Toast
                  ref={this.toastRef}
                  position='top'
                  style={{ zIndex: 1000 }}
                />
              </React.Fragment>
            </SafeAreaView>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    )
  }
}
