import { connect } from 'react-redux'
import { Welcome as WelcomeComponent } from './Welcome'
import { welcome } from './slice'

const mapStateToProps = state => ({
  shouldDisplay: welcome.selectors.getShouldDisplay(state)
})

export const Welcome = connect(
  mapStateToProps,
  { setShouldDisplay: welcome.actions.setShouldDisplay }
)(WelcomeComponent)
