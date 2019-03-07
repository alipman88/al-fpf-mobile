import get from 'lodash/get'
import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

const initialState = {
  user: {
    profiles: []
  },
  loading: false,
  currentProfileId: 0
}

export const profile = createSlice({
  slice: 'profile',
  initialState: {
    ...initialState
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload
    }),
    setUserProfile: (state, action) => {
      return {
        ...state,
        user: action.payload,
        currentProfileId:
          state.currentProfileId || get(action, 'payload.profiles[0].id', 0)
      }
    },
    setCurrentProfileId: (state, action) => ({
      ...state,
      currentProfileId: action.payload
    })
  },
  extraReducers: {
    [resetAction]: () => ({
      ...initialState
    })
  }
})

const getCurrentProfileId = createSelector(
  ['main.profile'],
  profile => profile.currentProfileId
)

const getProfiles = createSelector(
  ['main.profile'],
  profile => profile.user.profiles || []
)

const getCurrentProfile = createSelector(
  [getProfiles, getCurrentProfileId],
  (profiles, id) => profiles.find(profile => profile.id === id) || {}
)

profile.selectors = {
  ...profile.selectors,
  getUser: createSelector(
    ['main.profile'],
    profile => profile.user
  ),
  getProfiles,
  getLoading: createSelector(
    ['main.profile'],
    profile => profile.loading
  ),
  getCurrentProfileId,
  getCurrentProfile
}
