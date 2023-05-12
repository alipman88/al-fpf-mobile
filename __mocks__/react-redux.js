import React from 'react'
import noop from 'lodash/noop'
import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { mainReducer } from '@common/store/mainReducer'
import { securedReducer } from '@common/store/securedReducer'

const reducer = combineReducers({
  main: mainReducer,
  secured: securedReducer,
})

const middlewares = compose(applyMiddleware(thunk))

const store = createStore(reducer, undefined, middlewares)

export const connect = (mapStateToProps, mapDispatch) => (ReactComponent) => {
  mapStateToProps = mapStateToProps || noop
  const NewComponent = () => {
    return (
      <ReactComponent {...mapStateToProps(store.getState())} {...mapDispatch} />
    )
  }

  const wrappedComponentName =
    ReactComponent.displayName || ReactComponent.name || 'Component'

  NewComponent.displayName = `Connect(${wrappedComponentName})`

  return NewComponent
}

export const Provider = ({ children }) => children
