import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

const initialState = {
  areas: [],
  currentAreaId: 0,
  neighboringAreas: {}
}

export const areas = createSlice({
  slice: 'areas',
  initialState: {
    ...initialState
  },
  reducers: {
    setAreas: (state, action) => {
      const neighboringAreas = {
        ...state.neighboringAreas
      }

      for (const area of action.payload) {
        for (const neighbor of area.neighbor_areas) {
          neighboringAreas[neighbor.id] = neighbor.name
        }
      }

      return {
        ...state,
        areas: action.payload,
        neighboringAreas
      }
    },
    setCurrentAreaId: (state, action) => {
      return {
        ...state,
        currentAreaId: action.payload
      }
    }
  },
  extraReducers: {
    [resetAction]: () => ({
      ...initialState
    })
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
  ),
  getNeighboringAreas: createSelector(
    [path],
    areas => areas.neighboringAreas
  )
}
