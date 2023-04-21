import { getAreas, areas } from '@common/areas'
import { getProfiles, profile } from '@common/profile'
import { issues } from '@common/issues'
import { getAppSettings } from '@common/appSettings'
import { appMessage } from '@components/AppMessage/slice'

export const setupForumData =
  (navigation, resetCurrentIssueState = false) =>
  async (dispatch, getState) => {
    await dispatch(getProfiles())
    await dispatch(getAppSettings())
    await dispatch(getAreas(navigation))

    // Reset current area to null - this triggers a React state
    // change, ensureing any newly-published issues are fetched
    // via API before rendering the forum.
    // (NOTE: This may no longer be necessary.)
    dispatch(areas.actions.setCurrentAreaId(null))

    // pull latest areas, and set current area based on profile
    const currentProfile = profile.selectors.getCurrentProfile(getState())
    const userAreas = areas.selectors.getAreas(getState())
    const areaIds = (currentProfile && currentProfile.area_ids) || []
    const firstArea = userAreas.find((area) => areaIds.indexOf(area.id) !== -1)
    if (firstArea) {
      // set the current area id to the first one in the profile
      dispatch(areas.actions.setCurrentAreaId(firstArea.id))
      // reset the current issue id, the Forum component will handle it from here
      dispatch(issues.actions.setCurrentIssueId(0))
      dispatch(areas.actions.setHasAreaAccess(true))
    } else if (profile.selectors.hasUnapprovedProfile(getState())) {
      dispatch(
        appMessage.actions.setAppMessage({
          message:
            'Your government profile will be reviewed within 48 hours. Once ' +
            'approved, you will have access to your FPF(s). Please contact us ' +
            'as needed.',
          type: 'warning',
        })
      )
      dispatch(areas.actions.setHasAreaAccess(true))
    } else {
      // User either has no active profiles or access to no enabled areas
      // Set hasAreaAccess to false to trigger an alert.
      dispatch(areas.actions.setHasAreaAccess(false))
    }
  }
