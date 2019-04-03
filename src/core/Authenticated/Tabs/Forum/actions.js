import { Platform } from 'react-native'

import * as api from '@common/api'
import { currentUser } from '@common/currentUser'

export const sendNewFCMToken = fcmToken => async (dispatch, getState) => {
  await api.postAuthorized(
    '/devices',
    {
      fcm_token: fcmToken,
      device_type: Platform.OS
    },
    getState()
  )

  dispatch(currentUser.actions.setFCMToken(fcmToken))
}
