import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { AsyncStorage } from 'react-native'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
import mainReducer from './mainReducer'
import securedReducer from './securedReducer'

const loggerMiddleware = createLogger({
  predicate: () => window.__DEV__ && !window.__TEST__
})

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'frontPorchForumKeychain',
  sharedPreferencesName: 'frontPorchForumSharedPrefs'
})

const mainPersistConfig = {
  key: 'main',
  storage: AsyncStorage,
  blacklist: ['appError']
}

const securedPersistConfig = {
  key: 'token',
  storage: sensitiveStorage
}

const reducer = combineReducers({
  main: persistReducer(mainPersistConfig, mainReducer),
  secured: persistReducer(securedPersistConfig, securedReducer)
})

const middlewares = compose(applyMiddleware(thunk, loggerMiddleware))

const composedMiddlewares =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__DEV__
    ? compose(
        middlewares,
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : middlewares

export const store = createStore(reducer, undefined, composedMiddlewares)

export const persistor = persistStore(store)
