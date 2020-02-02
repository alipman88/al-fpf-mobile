import firebase from 'react-native-firebase'
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'

import { api } from '@common/api'
import { currentUser } from '@common/currentUser'

export const login = params => async (dispatch, getState) => {
  params = Object.assign(
    {
      os: Platform.OS,
      device_name: `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`,
      device_id: DeviceInfo.getUniqueId(),
      fcm_token: currentUser.selectors.getFCMToken(getState())
    },
    params
  )

  const response = await api.post('/login', params)

  dispatch(currentUser.actions.setAccessToken(response.data.access_token))
  firebase.analytics().setAnalyticsCollectionEnabled(true)
}
