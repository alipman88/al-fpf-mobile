import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

const initialState = {
  areas: [],
  currentAreaId: 0,
  neighboringAreas: {},
  loading: false
}

export const areas = createSlice({
  slice: 'areas',
  initialState: {
    ...initialState
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload
    }),
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
        neighboringAreas,
        loading: false
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
  getLoading: createSelector(
    [path],
    areas => areas.loading
  ),
  getNeighboringAreas: createSelector(
    [path],
    areas => areas.neighboringAreas
  ),
  // returns home forums & neighboring forums
  getFullAreasList: createSelector(
    [path],
    areas => {
      const uniqueAreaNames = new Set()
      const data = areas.areas
        .map(area => ({
          id: area.id,
          name: area.name
        }))
        .concat(
          Object.keys(areas.neighboringAreas).map(id => {
            return {
              id: parseInt(id, 10),
              name: areas.neighboringAreas[id]
            }
          })
        )
        .filter(area => {
          // remove duplicates such as neighbor areas that the member also has primary access to
          const newArea = !uniqueAreaNames.has(area.name)
          if (newArea) {
            uniqueAreaNames.add(area.name)
          }
          return newArea
        })

      data.sort((a, b) => {
        if (a.name === b.name) {
          return 0
        } else if (a.name < b.name) {
          return -1
        } else {
          return 1
        }
      })

      return data
    }
  )
}
