import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { View } from 'react-native'
import {
  IssueBox,
  IssueText,
  IssueTextBold,
  Triangle
} from './styledComponents'

export const IssueTab = ({ issue, focused }) => (
  <View>
    <IssueBox focused={focused}>
      <IssueTextBold>Issue #{issue.number}</IssueTextBold>
      <IssueText>{format(new Date(issue.sent_at), 'MMM D YYYY')}</IssueText>
    </IssueBox>
    {focused && <Triangle />}
  </View>
)

IssueTab.propTypes = {
  issue: PropTypes.object.isRequired,
  focused: PropTypes.bool.isRequired
}
