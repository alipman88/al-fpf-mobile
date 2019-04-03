import { newUser } from './slice'
import { api } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'
import { prepareValues } from './prepareValues'

export const postSignUp = () => (dispatch, getState) => {
  try {
    dispatch(newUser.actions.setLoading(true))
    const toSave = prepareValues(newUser.selectors.getNewUser(getState()))
    api.post('/users', toSave)
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  } finally {
    dispatch(newUser.actions.setLoading(false))
  }
}
