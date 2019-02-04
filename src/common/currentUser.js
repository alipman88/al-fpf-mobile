import { createSlice, createSelector } from 'redux-starter-kit'

export const currentUser = createSlice({
  slice: 'currentUser',
  initialState: {
    accessToken: null
  },
  reducers: {
    setAccessToken: (state, action) => ({
      ...state,
      accessToken: action.payload
    })
  }
})

currentUser.selectors = {
  ...currentUser.selectors,
  getAccessToken: createSelector(
    ['secured.currentUser'],
    currentUser => currentUser.accessToken
  )
}
