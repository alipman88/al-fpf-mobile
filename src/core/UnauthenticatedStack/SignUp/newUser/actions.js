import get from 'lodash/get'

import { newUser } from './slice'
import { api } from '@fpf/common/api'
import { appMessage } from '@fpf/components/AppMessage/slice'
import { prepareValues } from './prepareValues'

export const postSignUp = (navigation) => async (dispatch, getState) => {
  try {
    dispatch(newUser.actions.setLoading(true))
    const toSave = prepareValues(newUser.selectors.getNewUser(getState()))
    await api.post('/users', toSave)
    navigation.navigate('EmailVerification')
  } catch (e) {
    dispatch(
      appMessage.actions.setAppError(
        get(e, 'response.data.errors.email[0]', e.message),
      ),
    )
  } finally {
    dispatch(newUser.actions.setLoading(false))
  }
}
