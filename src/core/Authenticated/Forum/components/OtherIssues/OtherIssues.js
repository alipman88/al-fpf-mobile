import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { IssueTab } from './IssueTab'
import { IssueScrollView } from './styledComponents'

export class OtherIssues extends React.Component {
  onTapIssue = id => {
    this.props.setCurrentIssueId(id)
    this.props.getPosts(id)
  }

  scrollFocusedIssue = () => {
    if (this.focusedIssue) {
      this.focusedIssue.measure((x, y, width, height, pageX, pageY) => {
        this.scrollViewRef.scrollTo({ x: pageX, animated: true })
      })
    } else {
      this.scrollViewRef.scrollToEnd({ animated: true })
    }
  }

  render() {
    const { issues, currentIssueId } = this.props
    const issuesRender = issues
      .map(i => {
        const focused = currentIssueId === i.id
        return (
          <View
            onLayout={this.scrollFocusedIssue}
            key={i.id}
            ref={
              focused
                ? ref => {
                    this.focusedIssue = ref
                  }
                : undefined
            }
          >
            <IssueTab
              issue={i}
              key={i.id}
              focused={focused}
              onTapIssue={this.onTapIssue}
            />
          </View>
        )
      })
      .reverse()

    return (
      <IssueScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={this.scrollFocusedIssue}
        ref={ref => {
          this.scrollViewRef = ref
        }}
      >
        {issuesRender}
      </IssueScrollView>
    )
  }
}

OtherIssues.propTypes = {
  issues: PropTypes.array.isRequired,
  currentIssueId: PropTypes.number.isRequired,
  getPosts: PropTypes.func.isRequired,
  setCurrentIssueId: PropTypes.func.isRequired
}
