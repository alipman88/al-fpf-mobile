import { connect } from 'react-redux'
import keyBy from 'lodash/keyBy'

import { Profile as ProfileComponent } from './Profile'
import { areas } from '@common/areas'
import { profile } from '@common/profile'
import { navigateWithToken } from '@common/actions/navigateWithToken'

const mapStateToProps = (state, props) => ({
  areas: keyBy(areas.selectors.getAreas(state), 'id'),
  profile: profile.selectors
    .getProfiles(state)
    .find(profile => profile.id === props.navigation.getParam('profileId', 0))
})

export const Profile = connect(
  mapStateToProps,
  { navigateWithToken }
)(ProfileComponent)
