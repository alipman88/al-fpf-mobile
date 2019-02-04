import axios from 'axios'
import Config from 'react-native-config'

export const api = axios({
  baseURL: Config.API_HOST,
  headers: {
    Authorization: Config.API_KEY
  }
})
