import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

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
  },
  extraReducers: {
    [resetAction]: state => ({
      accessToken: ''
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
