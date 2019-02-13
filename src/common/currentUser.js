import { createSlice, createSelector } from 'redux-starter-kit'

export const currentUser = createSlice({
  slice: 'currentUser',
  initialState: {
    accessToken: ''
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
