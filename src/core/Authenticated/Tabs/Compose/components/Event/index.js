import { connect } from 'react-redux'

import { appMessage } from '@components/AppMessage/slice'
import { Event as EventComponent } from './Event'

export const Event = connect(
  null,
  { setAppError: appMessage.actions.setAppError }
)(EventComponent)
