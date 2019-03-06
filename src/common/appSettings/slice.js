import { createSlice, createSelector } from 'redux-starter-kit'

export const appSettings = createSlice({
  initialState: {
    postTruncateLength: 1000,
    categories: [],
    loading: false
  },

  reducers: {
    setAppSettings: (state, { payload }) => ({
      ...state,
      postTruncateLength: payload.posting_truncate_length,
      categories: payload.categories
    }),
    setLoading: (state, { payload }) => ({
      ...state,
      loading: payload
    })
  }
})

const getAppSettings = createSelector(
  ['main.appSettings'],
  ({ postTruncateLength, categories }) => ({
    postTruncateLength,
    categories
  })
)

appSettings.selectors = {
  getAppSettings,

  getCategories: createSelector(
    [getAppSettings],
    appSettings => appSettings.categories
  ),

  getPostTruncateLength: createSelector(
    [getAppSettings],
    appSettings => appSettings.postTruncateLength
  ),

  getLoading: createSelector(
    ['main.appSettings'],
    ({ loading }) => loading
  )
}
