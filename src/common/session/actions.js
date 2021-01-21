import analytics from '@react-native-firebase/analytics'
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'

import { api, postAuthorized } from '@common/api'
import { currentUser } from '@common/currentUser'

const deviceParams = {
  os: Platform.OS,
  device_name: `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`,
  device_id: DeviceInfo.getUniqueId()
}

export const login = params => async (dispatch, getState) => {
  const fcmToken = currentUser.selectors.getFCMToken(getState())
  params = Object.assign({ fcm_token: fcmToken }, deviceParams, params)

  const response = await api.post('/login', params)

  dispatch(currentUser.actions.setAccessToken(response.data.access_token))
  analytics().setAnalyticsCollectionEnabled(true)
}

export const sendDeviceData = () => async (dispatch, getState) => {
  const fcmToken = currentUser.selectors.getFCMToken(getState())
  const params = Object.assign({ fcm_token: fcmToken }, deviceParams)

  await postAuthorized('/app_sessions', params, getState())
}
