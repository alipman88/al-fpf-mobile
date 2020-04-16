import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

const initialState = {
  postsByIssue: {},
  sharedPostsByIssue: {},
  headlinesByIssue: {},
  adsByIssue: {},
  placementDateByIssue: {},
  newsFromNeighboringNfsByIssue: {},
  ocmMessageByIssue: {},
  loading: false
}

export const posts = createSlice({
  slice: 'posts',
  initialState: {
    ...initialState
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload
    }),
    setContentsForIssue: (state, { payload }) => ({
      ...state,
      postsByIssue: {
        ...state.postsByIssue,
        [payload.issueId]: payload.posts
      },
      sharedPostsByIssue: {
        ...state.sharedPostsByIssue,
        [payload.issueId]: payload.sharedPosts
      },
      headlinesByIssue: {
        ...state.headlinesByIssue,
        [payload.issueId]: payload.headlines
      },
      adsByIssue: {
        ...state.adsByIssue,
        [payload.issueId]: payload.ads
      },
      placementDateByIssue: {
        ...state.placementDateByIssue,
        [payload.issueId]: payload.placementDate
      },
      newsFromNeighboringNfsByIssue: {
        ...state.newsFromNeighboringNfsByIssue,
        [payload.issueId]: payload.newsFromNeighboringNfs
      },
      ocmMessageByIssue: {
        ...state.ocmMessageByIssue,
        [payload.issueId]: payload.ocmMessage
      },
      loading: false
    }),
    setAdsForIssue: (state, { payload }) => ({
      ...state,
      adsByIssue: {
        ...state.adsByIssue,
        [payload.issueId]: payload.ads
      },
      placementDateByIssue: {
        ...state.placementDateByIssue,
        [payload.issueId]: payload.placementDate
      },
      loading: false
    })
  },
  extraReducers: {
    [resetAction]: () => ({
      ...initialState
    })
  }
})

const path = 'main.posts'

posts.selectors = {
  ...posts.selectors,
  getPostsByIssue: createSelector(
    [path],
    posts => posts.postsByIssue
  ),
  getSharedPostsByIssue: createSelector(
    [path],
    posts => posts.sharedPostsByIssue
  ),
  getHeadlinesByIssue: createSelector(
    [path],
    posts => posts.headlinesByIssue
  ),
  getAdsByIssue: createSelector(
    [path],
    posts => posts.adsByIssue
  ),
  getPlacementDateByIssue: createSelector(
    [path],
    posts => posts.placementDateByIssue
  ),
  getLoading: createSelector(
    [path],
    posts => posts.loading
  ),
  getNewsFromNeighboringNfsByIssue: createSelector(
    [path],
    posts => posts.newsFromNeighboringNfsByIssue || {}
  ),
  getOcmMessageByIssue: createSelector(
    [path],
    posts => posts.ocmMessageByIssue || {}
  )
}
