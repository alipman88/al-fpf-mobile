import { connect } from 'react-redux'
import { currentUser } from '@fpf/common/currentUser'
import { Calendar as CalendarScreen } from './Calendar'

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
})

export const Calendar = connect(mapStateToProps)(CalendarScreen)
