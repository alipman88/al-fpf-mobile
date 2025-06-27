import { connect } from 'react-redux'

import { WebView as WebViewComponent } from './WebView'
import { appSettings } from '@fpf/common/appSettings'
import { composeEmail } from '@fpf/common/mailApp'
import { logoutUser } from '@fpf/core/Authenticated/Settings/SettingsIndex'
import { navigateWithToken } from '@fpf/common/actions/navigateWithToken'

const mapStateToProps = (state) => ({
  areaIdsBySlug: appSettings.selectors.getAreaIdsBySlug(state),
})

export const WebView = connect(mapStateToProps, {
  navigateWithToken,
  composeEmail,
  logoutUser,
})(WebViewComponent)
