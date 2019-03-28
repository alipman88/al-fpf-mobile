import { connect } from 'react-redux'

import { Waitlist as WaitlistComponent } from './Waitlist'
import { joinWaitlist } from './actions'
import { newUser } from '../newUser'

const mapStateToProps = state => ({
  newUser: newUser.selectors.getNewUser(state)
})

export const Waitlist = connect(
  mapStateToProps,
  {
    joinWaitlist,
    setNewUserByKey: newUser.actions.setNewUserByKey
  }
)(WaitlistComponent)
