import { Linking } from 'react-native'
import Config from 'react-native-config'
import queryString from 'query-string'
import * as api from '@common/api'

import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const navigateWithToken = (url, setLoading) => async (
  dispatch,
  getState
) => {
  try {
    setLoading(true)
    const urlObj = new URL(`${Config.WEBSITE_HOST}${url}`)
    const response = await api.postAuthorized(
      '/get_login_token',
      {},
      getState()
    )

    const search = queryString.parse(urlObj.search)
    search.temporary_login_token = response.data.token
    urlObj.search = queryString.stringify(search)
    Linking.openURL(urlObj.toString())
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  } finally {
    setLoading(false)
  }
}
