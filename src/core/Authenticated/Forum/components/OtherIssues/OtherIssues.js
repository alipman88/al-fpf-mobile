import React from 'react'
import PropTypes from 'prop-types'
import { IssueTab } from './IssueTab'
import { IssueScrollView } from './styledComponents'

export class OtherIssues extends React.Component {
  render() {
    const { issues, currentIssueNumber } = this.props
    const issuesRender = issues
      .map(i => (
        <IssueTab
          issue={i}
          key={i.id}
          focused={i.number === currentIssueNumber}
        />
      ))
      .reverse()

    return (
      <IssueScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd({ animated: true })
        }}
      >
        {issuesRender}
      </IssueScrollView>
    )
  }
}

OtherIssues.propTypes = {
  issues: PropTypes.array.isRequired,
  currentIssueNumber: PropTypes.number.isRequired
}
