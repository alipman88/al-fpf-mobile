import { connect } from 'react-redux'
import keyBy from 'lodash/keyBy'

import { Profile as ProfileComponent } from './Profile'
import { areas } from '@common/areas'
import { profile } from '@common/profile'
import { navigateWithToken } from '@common/actions/navigateWithToken'

const mapStateToProps = (state, props) => ({
  areas: keyBy(areas.selectors.getAreas(state), 'id'),
  profile: profile.selectors.getNavigationProfile(state, props),
  ...profile.selectors.getNavigationProfileSubscriptionState(state, props),
})

export const Profile = connect(mapStateToProps, { navigateWithToken })(
  ProfileComponent
)
