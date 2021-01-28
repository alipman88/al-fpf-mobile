import * as api from '@common/api'
import { responseError } from '@common/utils/responseError'

import { appMessage } from '@components/AppMessage/slice'

export const searchAddress = (values, onSuccess) => async (
  dispatch,
  getState
) => {
  try {
    const response = await api.postAuthorized(
      '/areas/for_address',
      {
        address: {
          street_number: values.streetNumber,
          apt_number: values.secondaryAddress,
          street_name: values.streetName,
          city: values.city,
          state: values.state,
        },
      },
      getState()
    )
    onSuccess(response.data.areas, response.data.address)
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  }
}
