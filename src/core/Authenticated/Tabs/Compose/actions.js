import get from 'lodash/get'

import { appMessage } from '@components/AppMessage/slice'
import { postAuthorized } from '@common/api'
import { responseError } from '@common/utils/responseError'

export const submitPost = (onSuccess, values, setSubmitting) => async (
  dispatch,
  getState
) => {
  setSubmitting(true)
  try {
    await postAuthorized('/users/posts', values, getState())
    onSuccess()
  } catch (e) {
    dispatch(
      // using nested get calls here, since the field has a dot in it.
      appMessage.actions.setAppError(
        get(
          get(get(e, 'response.data.errors'), 'event.base'),
          '[0]',
          responseError(e)
        )
      )
    )
  } finally {
    setSubmitting(false)
  }
}
