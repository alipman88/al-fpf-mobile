import { connect } from 'react-redux'
import { issues } from '../../issues'
import { OtherIssues as OtherIssuesComponent } from './OtherIssues'

const mapStateToProps = state => {
  return {
    issues: issues.selectors.getLatestIssues(state),
    currentIssueNumber: issues.selectors.getCurrentIssueNumber(state)
  }
}

export const OtherIssues = connect(mapStateToProps)(OtherIssuesComponent)
