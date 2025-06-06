import React from 'react'
import { AppState, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-easy-toast'
import * as RNIap from 'react-native-iap'
import SplashScreen from 'react-native-splash-screen'

import { Config } from '@fpf/common/config'
import { store, persistor } from '@fpf/common/store'
import { currentUser } from '@fpf/common/currentUser'
import { AppMessage } from '@fpf/components/AppMessage'
import { getProducts } from '@fpf/common/products'
import { Container } from './Container'
import { Offline } from './Offline'
import { purchaseUpdated, purchaseError } from '@fpf/common/purchases'
import { sendDeviceData } from '@fpf/common/session'
import { getAreas } from '@fpf/common/areas'
import { getProfiles } from '@fpf/common/profile'
import { subscriptionSkus } from '@fpf/common/types/subscriptionSkus'
import { setApplicationIconBadgeNumber } from '@fpf/common/notifications'
import { rollbar } from '@fpf/common/utils/rollbar'
import { plausible } from '@fpf/common/utils/plausible'

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
      this.handleAppStateChange,
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
          },
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
        store.dispatch(getAreas())
        store.dispatch(getProfiles())
      }
    }

    this.setState({ appState: nextAppState })
  }

  handleNavigationChange = (currentRouteName) => {
    // Convert navigation route names to plausible URLs (so their views are
    // more or less integrated with matching web app page views)
    const plausibleViewPaths = {
      Account: 'user',
      Address: 'registration/address',
      BasicInfo: 'registration/basic_info',
      BusinessInfo: 'registration/business_info',
      Calendar: null, // skipped b/c webview
      Compose: null, // skipped b/c webview
      CreateAccount: 'user/new',
      Directory: null, // skipped b/c webview
      EmailVerification: 'registration/email_verification',
      Forum: null, // skipped b/c logged within the view
      GovernmentInfo: 'registration/government_info',
      CandidateInfo: 'registration/candidate_info',
      Login: 'login',
      MapScreen: 'registration/map',
      Profile: 'user/profiles',
      ProfileTypes: 'registration/profile_types',
      Search: null, // skipped b/c webview
      SettingsIndex: 'settings',
      Subscription: 'subscription',
      Waitlist: 'interest-form/new',
      WaitlistSuccess: 'interest-form/success',
      Welcome: 'welcome',
    }

    // If the route name matches a plausible path, track the page view
    const path = plausibleViewPaths[currentRouteName]
    if (path) {
      plausible.trackPageview({ path })
    }
    // Or if we forgot to configure the route name here, log a rollbar warning
    else if (!(currentRouteName in plausibleViewPaths)) {
      rollbar.warn('Unexpected navigation route name in Plausible config', {
        currentRouteName,
      })
    }
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
        </PersistGate>
      </Provider>
    )
  }
}
