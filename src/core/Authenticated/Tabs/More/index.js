import { connect } from 'react-redux'
import { areas } from '@common/areas'
import { More as MoreScreen } from './More'

const mapStateToProps = state => ({
  currentAreaId: areas.selectors.getCurrentAreaId(state)
})

export const More = connect(mapStateToProps)(MoreScreen)
