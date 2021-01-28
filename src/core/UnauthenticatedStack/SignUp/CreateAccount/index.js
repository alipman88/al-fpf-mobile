import { connect } from 'react-redux'

import { CreateAccount as CreateAccountComponent } from './CreateAccount'
import { newUser, postSignUp } from '../newUser'

const mapStateToProps = (state) => ({
  profileType: newUser.selectors.getProfileType(state),
  loading: newUser.selectors.getLoading(state),
})

export const CreateAccount = connect(mapStateToProps, {
  postSignUp,
  setNewUserByKey: newUser.actions.setNewUserByKey,
})(CreateAccountComponent)
