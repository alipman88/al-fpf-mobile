import get from 'lodash/get'
import analytics from '@react-native-firebase/analytics'

import { newUser } from './slice'
import { api } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { prepareValues } from './prepareValues'

export const postSignUp = (navigation) => async (dispatch, getState) => {
  try {
    dispatch(newUser.actions.setLoading(true))
    const toSave = prepareValues(newUser.selectors.getNewUser(getState()))
    await api.post('/users', toSave)
    analytics().setAnalyticsCollectionEnabled(true)
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
