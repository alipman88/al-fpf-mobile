import { getAreas, areas } from '@common/areas'
import { getIssues, issues } from './issues'
import { getPosts } from './posts'
import { getProfiles, profile } from '@common/profile'
import { getAppSettings } from '@common/appSettings'

export const setupForumData = () => async (dispatch, getState) => {
  await dispatch(getProfiles())
  await dispatch(getAppSettings())
  await dispatch(getAreas())

  let currentAreaId = areas.selectors.getCurrentAreaId(getState())
  // default state, none set
  if (currentAreaId === 0) {
    const currentProfile = profile.selectors.getCurrentProfile(getState())
    const userAreas = areas.selectors.getAreas(getState())
    const firstArea = userAreas.find(
      area => currentProfile.area_ids.indexOf(area.id) !== -1
    )
    if (firstArea) {
      // set the current area id to the first one in the profile
      dispatch(areas.actions.setCurrentAreaId(firstArea.id))
      currentAreaId = firstArea.id
    }
  }

  if (currentAreaId !== 0) {
    await dispatch(getIssues(currentAreaId))
    await dispatch(getPosts(issues.selectors.getCurrentIssueId(getState())))
  }
}
