import { filter, find, get } from 'lodash'
import { createSlice, createSelector } from 'redux-starter-kit'

import { rollbar } from '@common/utils/rollbar'
import { resetAction } from '@common/resetAction'

const initialState = {
  user: {
    profiles: []
  },
  loading: false,
  currentProfileId: undefined
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
      rollbar.setPerson(
        '' + payload.id, // rollbar-react-native expects a string id
        `${payload.first_name} ${payload.last_name}`,
        payload.email
      )

      const availableProfiles = filter(payload.profiles, { approved: true })
      const currentProfileId =
        state.currentProfileId || get(availableProfiles, '[0].id')

      return {
        ...state,
        user: {
          ...payload
        },
        currentProfileId
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
    }),
    setValueInProfileData: (state, { payload }) => {
      console.log(payload)
      let updated_profiles = state.user.profiles.map(obj => {
        return {
          ...obj,
          ...payload[obj.id]
        }
      })

      return {
        ...state,
        user: {
          ...state.user,
          profiles: updated_profiles
        }
      }
    }
  },
  extraReducers: {
    [resetAction]: () => ({
      ...initialState
    })
  }
})

const getNavigationProfileId = (state, props) =>
  props.navigation.getParam('profileId', 0)

const getCurrentProfileId = createSelector(
  ['main.profile'],
  profile => profile.currentProfileId
)

const getProfiles = createSelector(
  ['main.profile'],
  profile => profile.user.profiles || []
)

const getAvailableProfiles = createSelector(
  ['main.profile'],
  profile => filter(profile.user.profiles, { approved: true })
)

const getCurrentProfile = createSelector(
  [getAvailableProfiles, getCurrentProfileId],
  (profiles, id) => find(profiles, { id })
)

const getNavigationProfile = createSelector(
  [getProfiles, getNavigationProfileId],
  (profiles, id) => find(profiles, { id })
)

const hasUnapprovedProfile = createSelector(
  [getProfiles],
  profiles => profiles.some(profile => !profile.available)
)

/**
 * Returns true if the user has an active Apple subscription in any of their profiles.
 */
const getUserHasAppleSubscription = createSelector(
  [getProfiles],
  profiles =>
    profiles.some(
      profile =>
        profile.active_subscription &&
        profile.active_subscription.service === 'apple'
    )
)

/**
 * Returns subscription status data for all profiles.  The return value is an
 * hash of profile ids to objects with the following keys:
 * - canSubscribe {boolean}: true if the user can subscribe via IAP
 * - hasSubscription {boolean}: true if the user has an active subscription
 * - hasAppleSubscription {boolean}: true if the user has an active Apple subscription
 */
const getSubscriptionState = createSelector(
  [getProfiles, getUserHasAppleSubscription],
  (profiles, userHasAppleSubscription) => {
    return profiles.reduce((data, profile) => {
      const hasSubscription = !!profile.active_subscription
      const hasAppleSubscription =
        get(profile, 'active_subscription.service') === 'apple'
      const canSubscribe =
        !hasSubscription &&
        !userHasAppleSubscription &&
        get(profile, 'profile_plan.plan_type') === 'business'

      data[profile.id] = {
        canSubscribe,
        hasSubscription,
        hasAppleSubscription
      }

      return data
    }, {})
  }
)

const getNavigationProfileSubscriptionState = createSelector(
  [getSubscriptionState, getNavigationProfileId],
  (state, id) => state[id] || {}
)

profile.selectors = {
  ...profile.selectors,
  getUser: createSelector(
    ['main.profile'],
    profile => profile.user
  ),
  getProfiles,
  getAvailableProfiles,
  hasUnapprovedProfile,
  getLoading: createSelector(
    ['main.profile'],
    profile => profile.loading
  ),
  getCurrentProfileId,
  getCurrentProfile,
  getNavigationProfile,
  getUserHasAppleSubscription,
  getSubscriptionState,
  getNavigationProfileSubscriptionState
}
