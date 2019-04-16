import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, View, findNodeHandle } from 'react-native'

import { IssueTab } from './IssueTab'
import { IssueScrollView } from './styledComponents'

export class OtherIssues extends React.Component {
  state = {
    x: 0,
    scrollWidth: Number.MAX_VALUE
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentIssueId !== this.props.currentIssueId) {
      this.scrollToFocusedIssue()
    }
  }

  onTapIssue = id => {
    this.props.setCurrentIssueId(id)
    this.props.getPosts(id)
    if (this.props.issues.find(issue => issue.id === id).isUnread) {
      this.props.toggleIssueUnread({
        id: id,
        isUnread: false,
        areaId: this.props.currentAreaId
      })
    }
  }

  scrollToFocusedIssue() {
    if (this.focusedIssue) {
      this.focusedIssue.measureLayout(findNodeHandle(this.scrollViewRef), x => {
        this.scrollViewRef.scrollTo({
          x: Math.min(this.state.scrollWidth, x),
          animated: true
        })
      })
    } else if (this.scrollViewRef) {
      this.scrollViewRef.scrollToEnd({ animated: true })
    }
  }

  scrollFocusedIssue = ev => {
    requestAnimationFrame(() => {
      this.scrollToFocusedIssue()
    })
  }

  sizeChange = width => {
    this.setState({ scrollWidth: width - Dimensions.get('screen').width })
  }

  render() {
    const { issues, currentIssueId, currentAreaId } = this.props
    const issuesRender = issues
      .map(i => {
        const focused = currentIssueId === i.id
        return (
          <View
            key={i.id}
            ref={
              focused
                ? ref => {
                    this.focusedIssue = ref
                  }
                : undefined
            }
            onLayout={focused ? this.scrollFocusedIssue : undefined}
          >
            <IssueTab
              issue={i}
              key={i.id}
              focused={focused}
              isUnread={!!i.isUnread}
              currentAreaId={currentAreaId}
              toggleIssueUnread={id => {
                this.props.toggleIssueUnread(id)
                this.props.toast.show('Issue marked as unread')
              }}
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
        onContentSizeChange={this.sizeChange}
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
  currentAreaId: PropTypes.number.isRequired,
  getPosts: PropTypes.func.isRequired,
  setCurrentIssueId: PropTypes.func.isRequired,
  toast: PropTypes.shape({
    show: PropTypes.func
  }).isRequired,
  toggleIssueUnread: PropTypes.func.isRequired
}
