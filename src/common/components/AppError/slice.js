import { createSlice, createSelector } from 'redux-starter-kit'
import capitalize from 'lodash/capitalize'

export const appError = createSlice({
  initialState: {
    message: ''
  },
  reducers: {
    setAppError: (_, action) => ({
      message: capitalize(action.payload)
    })
  }
})

appError.selectors = {
  ...appError.selectors,
  getError: createSelector(
    ['main.appError'],
    appError => appError.message
  )
}
