import { getAreas, areas } from '@common/areas'
import { getProfiles, profile } from '@common/profile'
import { issues } from '@common/issues'
import { getAppSettings } from '@common/appSettings'
import { appMessage } from '@components/AppMessage/slice'

export const setupForumData = (
  navigation,
  resetCurrentIssueState = false
) => async (dispatch, getState) => {
  await dispatch(getProfiles())
  await dispatch(getAppSettings())
  await dispatch(getAreas(navigation))

  // reset current area to 0, area fetches newest issues
  dispatch(areas.actions.setCurrentAreaId(0))

  // pull latest areas, and set current area based on profile
  const currentProfile = profile.selectors.getCurrentProfile(getState())
  const userAreas = areas.selectors.getAreas(getState())
  const areaIds = currentProfile.area_ids || []
  const firstArea = userAreas.find(area => areaIds.indexOf(area.id) !== -1)
  if (firstArea) {
    // set the current area id to the first one in the profile
    dispatch(areas.actions.setCurrentAreaId(firstArea.id))
    // reset the current issue id, the Forum component will handle it from here
    dispatch(issues.actions.setCurrentIssueId(0))
  } else if (Object.keys(currentProfile).length === 0) {
    dispatch(
      appMessage.actions.setAppMessage({
        message:
          'Your government profile will be reviewed within 48 hours. Once approved, you will have access to your FPF(s). Please contact us as needed.',
        type: 'warning'
      })
    )
  }
}
