import React from 'react'
import SideMenu from 'react-native-side-menu'
import { Linking } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { DrawerContext } from './context'
import { store, persistor } from '@common/store'
import { currentUser } from '@common/currentUser'
import { DrawerMenu } from '@components/DrawerMenu'
import { SwitchNavigatorContainer } from '@core/switchNavigator'
import { AppError } from '@components/AppError'
import { getDimensions, isTabletWidth } from '@common/utils/size'
import { parseDeepLink } from '@common/utils/parseDeepLink'
import { Spinner } from './Spinner'
import navigationService from '@common/utils/navigationService'

export class App extends React.Component {
  constructor(props) {
    super(props)

    // defined here so we can put it in inital state
    this.setDrawerOpenState = open => {
      this.setState(() => ({
        open
      }))
    }

    this.state = {
      open: false,
      setDrawerOpenState: this.setDrawerOpenState
    }
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL)
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
            <DrawerContext.Provider value={this.state}>
              <SideMenu
                menu={<DrawerMenu />}
                isOpen={this.state.open}
                onChange={open => this.setDrawerOpenState(open)}
                openMenuOffset={
                  isTabletWidth()
                    ? (getDimensions().width * 1) / 3
                    : (getDimensions().width * 2) / 3
                }
                bounceBackOnOverdraw={false}
              >
                <Spinner />
                <SwitchNavigatorContainer
                  ref={navigatorRef => {
                    navigationService.setTopLevelNavigator(navigatorRef)
                  }}
                />
              </SideMenu>
            </DrawerContext.Provider>
            <AppError />
          </React.Fragment>
        </PersistGate>
      </Provider>
    )
  }
}
