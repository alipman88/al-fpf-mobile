import pick from 'lodash/pick'
import { api } from '@fpf/common/api'
import { snakeCaseData } from '@fpf/common/utils/snakeCaseData'
import { responseError } from '@fpf/common/utils/responseError'

import { appMessage } from '@fpf/components/AppMessage/slice'

export const joinWaitlist = (values) => async (dispatch) => {
  try {
    await api.post('/waitlist_users', {
      user: {
        ...snakeCaseData(
          pick(values, [
            'email',
            'city',
            'state',
            'comment',
            'reference',
            'aptNumber',
            'streetNumber',
            'streetName',
            'firstName',
            'lastName',
            'organizationName',
            'webAddress',
          ]),
        ),
      },
    })
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  }
}
