import * as api from '@common/api'
import { currentUser } from '@common/currentUser'

export const sendNewFCMToken = fcmToken => async (dispatch, getState) => {
  await api.postAuthorized(
    '/app_sessions',
    {
      fcm_token: fcmToken
    },
    getState()
  )

  dispatch(currentUser.actions.setFCMToken(fcmToken))
}
