import { createSlice, createSelector } from 'redux-starter-kit'

export const areas = createSlice({
  slice: 'areas',
  initialState: {
    areas: []
  },
  reducers: {
    setAreas: (state, action) => ({
      ...state,
      areas: action.payload
    })
  }
})

areas.selectors = {
  ...areas.selectors,
  getAreas: createSelector(
    ['main.areas'],
    areas => areas.areas
  )
}
