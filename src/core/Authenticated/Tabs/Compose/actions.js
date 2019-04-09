import { appMessage } from '@components/AppMessage/slice'
import { responseError } from '@common/utils/responseError'
import { postAuthorized } from '@common/api'

export const submitPost = (onSuccess, values, setSubmitting) => async (
  dispatch,
  getState
) => {
  setSubmitting(true)
  try {
    await postAuthorized('/users/posts', values, getState())
    onSuccess()
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  } finally {
    setSubmitting(false)
  }
}
