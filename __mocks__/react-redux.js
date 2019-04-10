import React from 'react'
import noop from 'lodash/noop'
import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { mainReducer } from '@common/store/mainReducer'
import { securedReducer } from '@common/store/securedReducer'

const reducer = combineReducers({
  main: mainReducer,
  secured: securedReducer
})

const middlewares = compose(applyMiddleware(thunk))

const store = createStore(reducer, undefined, middlewares)

export const connect = (
  mapStateToProps,
  mapDispatch
) => ReactComponent => () => {
  mapStateToProps = mapStateToProps || noop
  return (
    <ReactComponent {...mapStateToProps(store.getState())} {...mapDispatch} />
  )
}

export const Provider = ({ children }) => children
