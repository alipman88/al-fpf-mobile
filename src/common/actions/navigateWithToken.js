import { Linking } from 'react-native'
import Config from 'react-native-config'
import parse from 'url-parse'
import * as api from '@common/api'

import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const navigateWithToken = (url, setLoading) => async (
  dispatch,
  getState
) => {
  try {
    setLoading(true)
    const urlObj = parse(`${Config.WEBSITE_HOST}${url}`, true)
    const response = await api.postAuthorized(
      '/get_login_token',
      {},
      getState()
    )

    urlObj.query.temporary_login_token = response.data.token
    Linking.openURL(urlObj.toString())
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  } finally {
    setLoading(false)
  }
}
