import { connect } from 'react-redux'
import { AppError as AppErrorComponent } from './AppError'
import { appError } from './slice'

const mapStateToProps = state => ({
  error: appError.selectors.getError(state)
})

export const AppError = connect(
  mapStateToProps,
  { setAppError: appError.actions.setAppError }
)(AppErrorComponent)
