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
    setUserProfile: (state, { payload }) => {
      const profiles = (payload.profiles || []).filter(
        profile => profile.approved
      )
      return {
        ...state,
        user: {
          ...payload,
          profiles
        },
        currentProfileId: state.currentProfileId || get(profiles, '[0].id', 0)
      }
    },
    setCurrentProfileId: (state, action) => ({
      ...state,
      currentProfileId: action.payload
    }),
    setValueInUserData: (state, { payload }) => ({
      ...state,
      user: {
        ...state.user,
        [payload.key]: payload.value
      }
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

/**
 * Identifies whether profile / user has an active subscription.
 */
const getSubscriptionStatus = createSelector(
  [getCurrentProfile, getProfiles],
  (profile, profiles) => ({
    hasSubscription: !!profile.active_subscription,
    hasIAPSubscription: !!(
      profile.active_subscription &&
      profile.active_subscription.service === 'apple'
    ),
    userHasIAPSubscription: !!profiles.some(
      profile =>
        profile.active_subscription &&
        profile.active_subscription.service === 'apple'
    )
  })
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
  getCurrentProfile,
  getSubscriptionStatus
}
