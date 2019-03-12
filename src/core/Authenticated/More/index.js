import { connect } from 'react-redux'
import { createStackNavForTab } from '../createStackNavForTab'
import { areas } from '@common/areas'
import { More as MoreScreen } from './More'

const mapStateToProps = state => ({
  currentAreaId: areas.selectors.getCurrentAreaId(state)
})

export const More = createStackNavForTab({
  More: connect(mapStateToProps)(MoreScreen)
})
