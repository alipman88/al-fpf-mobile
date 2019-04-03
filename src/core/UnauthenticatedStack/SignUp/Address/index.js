import { connect } from 'react-redux'

import { Address as AddressComponent } from './Address'
import { newUser } from '../newUser'
import { searchAddress } from './actions'

const mapStateToProps = state => ({
  newUser: newUser.selectors.getNewUser(state),
  profileType: newUser.selectors.getProfileType(state)
})

export const Address = connect(
  mapStateToProps,
  {
    searchAddress,
    setNewUserByKey: newUser.actions.setNewUserByKey
  }
)(AddressComponent)
