import { createSlice, createSelector } from 'redux-starter-kit'

export const areas = createSlice({
  slice: 'areas',
  initialState: {
    areas: [],
    currentAreaId: 0
  },
  reducers: {
    setAreas: (state, action) => {
      return {
        ...state,
        areas: action.payload
      }
    },
    setCurrentAreaId: (state, action) => {
      return {
        ...state,
        currentAreaId: action.payload
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
