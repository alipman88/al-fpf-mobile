import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

export const currentUser = createSlice({
  slice: 'currentUser',
  initialState: {
    accessToken: '',
    fcmToken: '',
  },
  reducers: {
    setAccessToken: (state, action) => ({
      ...state,
      accessToken: action.payload,
    }),
    setFCMToken: (state, action) => ({
      ...state,
      fcmToken: action.payload,
    }),
  },
  extraReducers: {
    [resetAction]: (state) => ({
      accessToken: '',
      fcmToken: '',
    }),
  },
})

currentUser.selectors = {
  ...currentUser.selectors,
  getAccessToken: createSelector(
    ['secured.currentUser'],
    (currentUser) => currentUser.accessToken
  ),
  getFCMToken: createSelector(
    ['secured.currentUser'],
    (currentUser) => currentUser.fcmToken
  ),
}
