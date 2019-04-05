import { createSlice, createSelector } from 'redux-starter-kit'
import { uniqueId } from 'lodash'

export const appSettings = createSlice({
  initialState: {
    postTruncateLength: 1000,
    categories: [],
    businessCategories: {},
    onboardingProfilePlans: [],
    governmentTitles: [],
    loading: false
  },

  reducers: {
    setAppSettings: (state, { payload }) => ({
      ...state,
      postTruncateLength: payload.posting_truncate_length,
      categories: payload.categories,
      businessCategories: payload.business_categories,
      onboardingProfilePlans: payload.onboarding_profile_plans,
      governmentTitles: payload.official_titles
    }),
    setLoading: (state, { payload }) => ({
      ...state,
      loading: payload
    })
  }
})

const path = 'main.appSettings'

appSettings.selectors = {
  getAppSettings: createSelector(
    [path],
    appSettings => appSettings
  ),

  getCategories: createSelector(
    [path],
    appSettings => appSettings.categories
  ),

  getBusinessCategories: createSelector(
    [path],
    appSettings =>
      Object.entries(appSettings.businessCategories).map(([key, value]) => {
        return {
          name: key,
          id: Number(uniqueId()),
          children: value.map(item => {
            return { name: item[0], id: item[1] }
          })
        }
      })
  ),

  getGovernmentTitles: createSelector(
    [path],
    appSettings => appSettings.governmentTitles
  ),

  getProfilePlans: createSelector(
    [path],
    appSettings => appSettings.onboardingProfilePlans
  ),

  getPostTruncateLength: createSelector(
    [path],
    appSettings => appSettings.postTruncateLength
  ),

  getLoading: createSelector(
    ['main.appSettings'],
    ({ loading }) => loading
  )
}
