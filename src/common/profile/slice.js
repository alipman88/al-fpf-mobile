import { createSlice, createSelector } from 'redux-starter-kit'

export const profile = createSlice({
  slice: 'profile',
  initialState: {
    user: {
      profiles: []
    }
  },
  reducers: {
    setUserProfile: (state, action) => {
      return {
        ...state,
        user: action.payload
      }
    }
  }
})

profile.selectors = {
  ...profile.selectors,
  getUser: createSelector(
    ['main.profile'],
    profile => profile.user
  ),
  getProfiles: createSelector(
    ['main.profile'],
    profile => profile.user.profiles || []
  )
}
