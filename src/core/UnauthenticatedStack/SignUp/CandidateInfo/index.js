import { connect } from 'react-redux'
import { newUser } from '../newUser'
import { CandidateInfo as CandidateInfoComponent } from './CandidateInfo'

const mapStateToProps = (state) => {
  return {
    newUser: newUser.selectors.getNewUser(state),
  }
}

export const CandidateInfo = connect(mapStateToProps, {
  setNewUserByKey: newUser.actions.setNewUserByKey,
})(CandidateInfoComponent)
