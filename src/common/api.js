import axios from 'axios'

import { Config } from '@fpf/common/config'
import { currentUser } from './currentUser'
import DeviceInfo from 'react-native-device-info'

const api = axios.create({
  baseURL: Config.API_HOST,
  headers: {
    'X-API-KEY': `Bearer ${Config.API_KEY}`,
    'X-APP-INFO': `FpfMobileApp/802.${DeviceInfo.getVersion()}`,
  },
})

// The stack traces of errors resulting from failed asynchronous axios
// requests do not include the actual code that called an axios request in
// the first place. This makes debugging very difficult - use an axios
// interceptor to append the original stack trace so that the code which
// triggered the failing axios request may be determined via rollbar.
// https://github.com/axios/axios/issues/2387#issuecomment-652242713
api.interceptors.request.use((config) => {
  config.errorContext = new Error('Thrown at:')
  return config
})

api.interceptors.response.use(undefined, async (error) => {
  const originalStackTrace = error.config?.errorContext?.stack

  if (originalStackTrace) {
    error.stack = `${error.stack}\n${originalStackTrace}`
  }

  throw error
})

export { api }

const getAuthorizedHeaders = (state) => ({
  Authorization: `Bearer ${currentUser.selectors.getAccessToken(state)}`,
})

export const getAuthorized = (uri, state, options = {}) =>
  api.get(uri, {
    headers: getAuthorizedHeaders(state),
    ...options,
  })

export const postAuthorized = (uri, data, state, options = {}) =>
  api.post(uri, data, {
    headers: getAuthorizedHeaders(state),
    ...options,
  })

export const putAuthorized = (uri, data, state, options = {}) =>
  api.put(uri, data, {
    headers: getAuthorizedHeaders(state),
    ...options,
  })
