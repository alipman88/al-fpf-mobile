import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native'
import {
  IssueBox,
  IssueText,
  IssueTextBold,
  Triangle,
  UnreadMarker,
} from './styledComponents'

export class IssueTab extends React.Component {
  render() {
    const {
      issue,
      focused,
      onTapIssue,
      isUnread,
      toggleIssueUnread,
      currentAreaId,
    } = this.props

    return (
      <TouchableOpacity
        onPress={() => onTapIssue(issue.id)}
        onLongPress={() =>
          toggleIssueUnread({
            id: issue.id,
            isUnread: true,
            areaId: currentAreaId,
          })
        }
      >
        {isUnread && <UnreadMarker focused={focused} />}
        <IssueBox focused={focused} isUnread={isUnread}>
          <IssueTextBold allowFontScaling={false}>
            {format(new Date(issue.sent_at), 'MMM D YYYY')}
          </IssueTextBold>
          <IssueText allowFontScaling={false}>Issue #{issue.number}</IssueText>
        </IssueBox>
        {focused && <Triangle />}
      </TouchableOpacity>
    )
  }
}

IssueTab.propTypes = {
  issue: PropTypes.object.isRequired,
  focused: PropTypes.bool.isRequired,
  onTapIssue: PropTypes.func.isRequired,
  toggleIssueUnread: PropTypes.func.isRequired,
  isUnread: PropTypes.bool.isRequired,
  currentAreaId: PropTypes.number,
}
