import pick from 'lodash/pick'
import { api } from '@common/api'
import { snakeCaseData } from '@common/utils/snakeCaseData'
import { responseError } from '@common/utils/responseError'

import { appMessage } from '@components/AppMessage/slice'

export const joinWaitlist = values => async dispatch => {
  try {
    await api.post('/waitlist_users', {
      user: {
        ...snakeCaseData(
          pick(values, [
            'email',
            'city',
            'zip',
            'state',
            'comment',
            'reference',
            'secondaryAddress',
            'streetNumber',
            'streetName',
            'firstName',
            'lastName',
            'organizationName',
            'webAddress'
          ])
        )
      }
    })
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  }
}
