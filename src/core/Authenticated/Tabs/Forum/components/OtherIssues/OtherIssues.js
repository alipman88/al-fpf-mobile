import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, View, findNodeHandle } from 'react-native'
import Toast from 'react-native-easy-toast'

import { IssueTab } from './IssueTab'
import { IssueScrollView } from './styledComponents'

export class OtherIssues extends React.Component {
  state = {
    x: 0,
    scrollWidth: Number.MAX_VALUE,
  }

  componentDidUpdate() {
    this.scrollToFocusedIssue()
  }

  onTapIssue = (id) => {
    this.props.setCurrentIssueId(id)
    if (this.props.issues.find((issue) => issue.id === id).isUnread) {
      this.props.toggleIssueUnread({
        id: id,
        isUnread: false,
        areaId: this.props.currentAreaId,
      })
    }
  }

  scrollToFocusedIssue() {
    // using set timeout to ensure the code doesn't run until rendering is finished
    setTimeout(() => {
      if (this.focusedIssueRef) {
        this.focusedIssueRef.measureLayout(
          findNodeHandle(this.scrollViewRef),
          (x) => {
            this.scrollViewRef.scrollTo({
              x: Math.min(this.state.scrollWidth, x),
              animated: true,
            })
          }
        )
      } else if (this.scrollViewRef) {
        this.scrollViewRef.scrollToEnd({ animated: true })
      }
    })
  }

  sizeChange = (width) => {
    this.setState({ scrollWidth: width - Dimensions.get('screen').width })
  }

  render() {
    const { issues, currentIssueId, currentAreaId } = this.props
    const issuesRender = issues
      .map((i) => {
        const focused = currentIssueId === i.id
        return (
          <View
            key={i.id}
            ref={(ref) => {
              if (ref && focused) {
                this.focusedIssueRef = ref
              }
            }}
          >
            <IssueTab
              issue={i}
              key={i.id}
              focused={focused}
              isUnread={!!i.isUnread}
              currentAreaId={currentAreaId}
              toggleIssueUnread={(id) => {
                this.props.toggleIssueUnread(id)
                this.props.toast.current.show('Issue marked as unread')
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
        ref={(ref) => {
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
  setCurrentIssueId: PropTypes.func.isRequired,
  toast: PropTypes.shape({ current: PropTypes.instanceOf(Toast) }).isRequired,
  toggleIssueUnread: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}
