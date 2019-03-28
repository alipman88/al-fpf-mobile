import { api } from '@common/api'
import { responseError } from '@common/utils/responseError'

import { appError } from '@components/AppError/slice'

export const joinWaitlist = values => async dispatch => {
  try {
    await api.post('/waitlist_users', {
      user: {
        ...values,
        street_number: values.streetNumber,
        street_name: values.streetName,
        first_name: values.firstName,
        last_name: values.lastName,
        state: values.state[0]
      }
    })
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  }
}
