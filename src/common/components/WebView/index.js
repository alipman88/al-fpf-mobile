import { connect } from 'react-redux'
import { WebView as WebViewComponent } from './WebView'
import { appSettings } from '@fpf/common/appSettings'

const mapStateToProps = (state) => ({
  areaIdsBySlug: appSettings.selectors.getAreaIdsBySlug(state),
})

export const WebView = connect(mapStateToProps)(WebViewComponent)
