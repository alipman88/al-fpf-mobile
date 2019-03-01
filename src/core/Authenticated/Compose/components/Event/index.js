import { connect } from 'react-redux'

import { appError } from '@components/AppError/slice'
import { Event as EventComponent } from './Event'

export const Event = connect(
  null,
  { setAppError: appError.actions.setAppError }
)(EventComponent)
