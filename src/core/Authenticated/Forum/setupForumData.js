import { getAreas, areas } from '@common/areas'
import { getIssues, issues } from './issues'
import { getPosts } from './posts'
import { getProfiles, profile } from '@common/profile'
import { getAppSettings } from '@common/appSettings'

export const setupForumData = () => async (dispatch, getState) => {
  await dispatch(getProfiles())
  await dispatch(getAppSettings())
  await dispatch(getAreas())

  const currentAreaId = areas.selectors.getCurrentAreaId(getState())
  // default state, none set
  if (currentAreaId === 0) {
    const currentProfile = profile.selectors.getCurrentProfile(getState())
    const userAreas = areas.selectors.getAreas(getState())
    // set the current area id tothe first one in the profile
    dispatch(
      areas.actions.setCurrentAreaId(
        userAreas.find(area => currentProfile.area_ids.indexOf(area.id) !== -1)
          .id || userAreas[0].id
      )
    )
  }

  await dispatch(getIssues(areas.selectors.getCurrentAreaId(getState())))
  await dispatch(getPosts(issues.selectors.getCurrentIssueNumber(getState())))
}
