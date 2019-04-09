import { connect } from 'react-redux'
import { AppMessage as AppMessageComponent } from './AppMessage'
import { appMessage } from './slice'

const mapStateToProps = state => ({
  message: appMessage.selectors.getMessage(state),
  type: appMessage.selectors.getMessageType(state)
})

export const AppMessage = connect(
  mapStateToProps,
  { setAppError: appMessage.actions.setAppError }
)(AppMessageComponent)
