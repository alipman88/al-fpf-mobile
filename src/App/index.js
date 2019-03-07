import React from 'react'
import SideMenu from 'react-native-side-menu'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { DrawerContext } from './context'
import { store, persistor } from '@common/store'
import { DrawerMenu } from '@components/DrawerMenu'
import { SwitchNavigatorContainer } from '@core/switchNavigator'
import { AppError } from '@components/AppError'
import { getDimensions, isTabletWidth } from '@common/utils/size'

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
                <SwitchNavigatorContainer />
              </SideMenu>
            </DrawerContext.Provider>
            <AppError />
          </React.Fragment>
        </PersistGate>
      </Provider>
    )
  }
}
