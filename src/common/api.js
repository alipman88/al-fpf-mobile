import axios from 'axios'

import { Config } from '@common/config'
import { currentUser } from './currentUser'

export const api = axios.create({
  baseURL: Config.API_HOST,
  headers: {
    'X-API-KEY': `Bearer ${Config.API_KEY}`,
  },
})

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
