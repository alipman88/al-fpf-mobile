import parse from 'url-parse'
import * as api from '@fpf/common/api'

import { Config } from '@fpf/common/config'
import { appMessage } from '@fpf/components/AppMessage/slice'
import { spinner } from '@fpf/app/Spinner/slice'
import { responseError } from '@fpf/common/utils/responseError'
import { openFpfUrl } from '@fpf/common/utils/openFpfUrl'

/**
 * Open the given FPF URL in a browser, but first get a temp auth token so that
 * the current user is logged in. The URL will also have some additional query
 * params to identify the source of traffic as the mobile app.
 *
 * @param {string} url to open, with optional domain attached (the configured
 *  website host will be prefixed if not present).
 */
export const navigateWithToken = (url) => async (dispatch, getState) => {
  try {
    dispatch(spinner.actions.setVisibility(true))

    if (!url.startsWith(Config.WEBSITE_HOST)) {
      url = `${Config.WEBSITE_HOST}${url}`
    }
    const urlObj = parse(url, true)

    // Get a login token from the API
    const response = await api.postAuthorized(
      '/get_login_token',
      {},
      getState(),
    )

    // Add that login token to the GET request as a query param
    urlObj.query.temporary_login_token = response.data.token

    // Use Linking to open the URL in a browser. openFpfUrl will add some additional
    // query params to identify the source of traffic as the mobile app.
    openFpfUrl(urlObj.toString())
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  } finally {
    dispatch(spinner.actions.setVisibility(false))
  }
}
