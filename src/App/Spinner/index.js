import { connect } from 'react-redux'

import { Spinner as SpinnerComponent } from './Spinner'
import { spinner } from './slice'

// The idea should be to move to use this component instead of <Spinner /> components in individual screens
// TODO: Update the usage of react-native-loading-spinner-overlay in the app to dispatch actions instead
const mapStateToProps = (state) => ({
  visible: spinner.selectors.getVisible(state),
})

export const Spinner = connect(mapStateToProps)(SpinnerComponent)
