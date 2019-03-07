import { areas } from '@common/areas'

export const fetchNeighboringIssue = news => async (dispatch, getState) => {
  dispatch(areas.actions.setCurrentAreaId(news.area_id))
}
