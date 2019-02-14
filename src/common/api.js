import axios from 'axios'
import Config from 'react-native-config'
import { currentUser } from './currentUser'

export const api = axios.create({
  baseURL: Config.API_HOST,
  headers: {
    'X-API-KEY': `Bearer ${Config.API_KEY}`
  }
})

const getAuthorizedHeaders = state => ({
  Authorization: `Bearer ${currentUser.selectors.getAccessToken(state)}`
})

export const getAuthorized = (uri, state, options = {}) =>
  api.get(uri, {
    headers: getAuthorizedHeaders(state),
    ...options
  })
