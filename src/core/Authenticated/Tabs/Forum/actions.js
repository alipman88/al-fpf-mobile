import { Platform } from 'react-native'

import * as api from '@common/api'
import { currentUser } from '@common/currentUser'

export const sendNewFCMToken = fcmToken => async (dispatch, getState) => {
  await api.postAuthorized(
    '/devices',
    {
      device_id: fcmToken,
      device_type: Platform.OS
    },
    getState()
  )

  dispatch(currentUser.actions.setFCMToken(fcmToken))
}
