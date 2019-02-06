import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '@common/store'
import { SwitchNavigatorContainer } from '@core/switchNavigator'
import { AppError } from '@components/AppError'

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <SwitchNavigatorContainer />
            <AppError />
          </React.Fragment>
        </PersistGate>
      </Provider>
    )
  }
}
