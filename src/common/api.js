import axios from 'axios'
import Config from 'react-native-config'

export const api = axios({
  baseURL: Config.API_HOST,
  headers: {
    Authorization: Config.API_KEY
  }
})

export const apiRequestThunk = (
  request,
  requestAction,
  successAction,
  failureAction
) => async dispatch => {
  dispatch(requestAction())
  try {
    const response = await request()
    dispatch(successAction(response))
  } catch (e) {
    dispatch(failureAction(e))
  }
}
