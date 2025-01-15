import * as api from '@fpf/common/api'
import { currentUser } from '@fpf/common/currentUser'

export const sendNewFCMToken = (fcmToken) => async (dispatch, getState) => {
  await api.postAuthorized(
    '/app_sessions',
    {
      fcm_token: fcmToken,
    },
    getState(),
  )

  dispatch(currentUser.actions.setFCMToken(fcmToken))
}
