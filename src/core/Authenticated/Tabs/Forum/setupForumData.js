import { getAreas, areas } from '@common/areas'
import { getProfiles, profile } from '@common/profile'
import { getAppSettings } from '@common/appSettings'
import { appMessage } from '@components/AppMessage/slice'

export const setupForumData = navigation => async (dispatch, getState) => {
  await dispatch(getProfiles())
  await dispatch(getAppSettings())
  await dispatch(getAreas(navigation))

  let currentAreaId = areas.selectors.getCurrentAreaId(getState())
  // default state, none set
  if (currentAreaId === 0) {
    const currentProfile = profile.selectors.getCurrentProfile(getState())
    const userAreas = areas.selectors.getAreas(getState())
    const areaIds = currentProfile.area_ids || []
    const firstArea = userAreas.find(area => areaIds.indexOf(area.id) !== -1)
    if (firstArea) {
      // set the current area id to the first one in the profile
      dispatch(areas.actions.setCurrentAreaId(firstArea.id))
      currentAreaId = firstArea.id
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
}
