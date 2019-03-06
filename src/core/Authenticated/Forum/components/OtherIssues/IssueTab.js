import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native'
import {
  IssueBox,
  IssueText,
  IssueTextBold,
  Triangle
} from './styledComponents'

export class IssueTab extends React.Component {
  render() {
    const { issue, focused, onTapIssue } = this.props

    return (
      <TouchableOpacity onPress={() => onTapIssue(issue.id)}>
        <IssueBox focused={focused}>
          <IssueTextBold>Issue #{issue.number}</IssueTextBold>
          <IssueText>{format(new Date(issue.sent_at), 'MMM D YYYY')}</IssueText>
        </IssueBox>
        {focused && <Triangle />}
      </TouchableOpacity>
    )
  }
}

IssueTab.propTypes = {
  issue: PropTypes.object.isRequired,
  focused: PropTypes.bool.isRequired,
  onTapIssue: PropTypes.func.isRequired
}
