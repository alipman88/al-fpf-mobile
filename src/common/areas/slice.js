import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@fpf/common/resetAction'
import sortBy from 'lodash/sortBy'

const initialState = {
  areas: [],
  currentAreaId: null,
  hasAreaAccess: true,
  neighboringAreas: {},
  loading: false,
}

export const areas = createSlice({
  slice: 'areas',
  initialState: {
    ...initialState,
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    setAreas: (state, action) => {
      const neighboringAreas = {
        ...state.neighboringAreas,
      }

      for (const area of action.payload) {
        for (const neighbor of area.neighbor_areas) {
          neighboringAreas[neighbor.id] = neighbor.name
        }
      }

      return {
        ...state,
        areas: sortBy(action.payload, ['name']),
        neighboringAreas,
        loading: false,
      }
    },
  },
  extraReducers: {
    [resetAction]: () => ({
      ...initialState,
    }),
  },
})

const path = 'main.areas'

areas.selectors = {
  ...areas.selectors,
  getAreas: createSelector([path], (areas) => areas.areas),
  getLoading: createSelector([path], (areas) => areas.loading),
}
