import { StackActions } from '@react-navigation/native'

import { issues, maxIssuesCount } from './slice'
import { posts } from '@common/posts/slice'
import { getAuthorized } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { resetAction } from '@common/resetAction'
import { responseError } from '@common/utils/responseError'
import { areas } from '@common/areas'
import { spinner } from '@app/Spinner/slice'
import * as commonActions from '@common/actions/navigateWithToken'
import get from 'lodash/get'

export const getIssues =
  (areaId, navigation, resetForumAction) => async (dispatch, getState) => {
    if (!areaId) return

    try {
      dispatch(issues.actions.setLoading(true))
      const response = await getAuthorized(
        `/areas/${areaId}/issues?page=1&count=${maxIssuesCount}`,
        getState()
      )

      // Show a deprecation message for old app versions only
      const eolInfo = get(response, 'data.eol_info')
      if (eolInfo) {
        dispatch(
          appMessage.actions.setAppMessage({
            message: eolInfo,
            type: 'warning',
          })
        )
      }

      if (!issues.selectors.getFirstLoadIssues(getState())) {
        dispatch(issues.actions.setFirstLoadOfIssues())
      }

      dispatch(
        issues.actions.setIssues({
          issues: response.data.issues,
          areaId,
        })
      )

      // After fetching new issues, old ones may have been removed.  Expire
      // orphaned posts for missing issues for all areas.
      const issueIds = issues.selectors.getIssueIds(getState())
      dispatch(posts.actions.expire({ exceptIssueIds: issueIds }))
    } catch (e) {
      dispatch(appMessage.actions.setAppError(responseError(e)))
      if (e.response.status === 401) {
        dispatch(resetAction())
        navigation.dispatch(StackActions.replace('Login'))
      } else if (e.response.status === 403 && resetForumAction) {
        dispatch(areas.actions.resetAreas())
        dispatch(resetForumAction(navigation))
      }
    } finally {
      dispatch(issues.actions.setLoading(false))
    }
  }

export const fetchSpecificIssue =
  (areaId, issueId, issueNumber, navigation, resetForumAction) =>
  async (dispatch, getState) => {
    try {
      dispatch(spinner.actions.setVisibility(true))
      const previousAreaId = areas.selectors.getCurrentAreaId(getState())
      // set current and fetch issues for that area
      dispatch(areas.actions.setCurrentAreaId(areaId))
      await dispatch(getIssues(areaId, navigation))

      // if the desired issue is not in the persisted issues for that forum
      const issuesForArea = issues.selectors.getIssuesForArea(
        getState(),
        areaId
      )
      if (!issuesForArea.find((issue) => issue.id === issueId)) {
        await dispatch(
          commonActions.navigateWithToken(
            `/areas/${areaId}/issues/${issueNumber}`
          )
        )
        // go back to previous forum
        dispatch(areas.actions.setCurrentAreaId(previousAreaId))
      } else {
        dispatch(issues.actions.setCurrentIssueId(issueId))
        navigation.navigate('Forum')
      }
    } catch (e) {
      dispatch(appMessage.actions.setAppError(responseError(e)))
      if (e.response.status === 401) {
        dispatch(resetAction())
        navigation.dispatch(StackActions.replace('Login'))
      } else if (e.response.status === 403 && resetForumAction) {
        resetForumAction(navigation)
      }
    } finally {
      dispatch(spinner.actions.setVisibility(false))
    }
  }
