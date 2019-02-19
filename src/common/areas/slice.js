import { createSlice, createSelector } from 'redux-starter-kit'

export const areas = createSlice({
  slice: 'areas',
  initialState: {
    areas: [],
    currentAreaId: 0
  },
  reducers: {
    setAreas: (state, action) => {
      const currentAreaId = state.currentAreaId || action.payload[0].id
      return {
        ...state,
        areas: action.payload,
        currentAreaId
      }
    }
  }
})

const path = 'main.areas'

areas.selectors = {
  ...areas.selectors,
  getAreas: createSelector(
    [path],
    areas => areas.areas
  ),
  getCurrentAreaId: createSelector(
    [path],
    areas => areas.currentAreaId
  )
}
