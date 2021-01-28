import { connect } from 'react-redux'
import { Compose as ComposeScreen } from './Compose'
import { areas } from '@common/areas'
import { profile } from '@common/profile'
import { submitPost } from './actions'
import { appSettings } from '@common/appSettings'
import { navigateWithToken } from '@common/actions/navigateWithToken'

const mapStateToProps = (state) => ({
  areas: areas.selectors.getAreas(state),
  profiles: profile.selectors.getAvailableProfiles(state),
  loading: profile.selectors.getLoading(state),
  currentProfileId: profile.selectors.getCurrentProfileId(state),
  categories: appSettings.selectors.getCategories(state),
})

export const Compose = connect(mapStateToProps, {
  navigateWithToken,
  submitPost,
})(ComposeScreen)
