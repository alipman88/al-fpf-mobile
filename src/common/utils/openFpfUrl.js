import { Linking } from 'react-native'
import parse from 'url-parse'
import DeviceInfo from 'react-native-device-info'

export const openFpfUrl = (url) => {
  const urlObj = parse(url, true)
  urlObj.query.app_info = `FpfMobileApp/802.${DeviceInfo.getVersion()}`
  urlObj.query.utm_medium = 'app'
  Linking.openURL(urlObj.toString())
}
