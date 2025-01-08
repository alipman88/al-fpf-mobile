import { connect } from 'react-redux'

import { updateUser, profile } from '@fpf/common/profile'
import { Account as AccountComponent } from './Account'

import { navigateWithToken } from '@fpf/common/actions/navigateWithToken'

const mapStateToProps = (state) => ({
  loading: profile.selectors.getLoading(state),
  user: profile.selectors.getUser(state),
})

export const Account = connect(mapStateToProps, {
  navigateWithToken,
  updateUser,
})(AccountComponent)
