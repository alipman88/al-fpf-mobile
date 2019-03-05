import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

const initialState = {
  areas: [],
  currentAreaId: 0
}

export const areas = createSlice({
  slice: 'areas',
  initialState: {
    ...initialState
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
  )
}
