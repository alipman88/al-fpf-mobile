import { createSlice, createSelector } from 'redux-starter-kit'

export const appError = createSlice({
  initialState: {
    message: ''
  },
  reducers: {
    setAppError: (_, action) => ({
      message: action.payload
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
