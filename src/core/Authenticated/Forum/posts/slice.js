import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

const initialState = {
  postsByIssue: {},
  headlinesByIssue: {},
  adsByIssue: {},
  newsFromNeighboringNfsByIssue: {},
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
    setPostsForIssue: (state, { payload }) => ({
      ...state,
      postsByIssue: {
        ...state.postsByIssue,
        [payload.issueId]: payload.posts
      },
      headlinesByIssue: {
        ...state.headlinesByIssue,
        [payload.issueId]: payload.headlines
      },
      adsByIssue: {
        ...state.adsByIssue,
        [payload.issueId]: payload.ads
      },
      newsFromNeighboringNfsByIssue: {
        ...state.newsFromNeighboringNfsByIssue,
        [payload.issueId]: payload.newsFromNeighboringNfs
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
  getHeadlinesByIssue: createSelector(
    [path],
    posts => posts.headlinesByIssue
  ),
  getAdsByIssue: createSelector(
    [path],
    posts => posts.adsByIssue
  ),
  getLoading: createSelector(
    [path],
    posts => posts.loading
  ),
  getNewsFromNeighboringNfsByIssue: createSelector(
    [path],
    posts => posts.newsFromNeighboringNfsByIssue || {}
  )
}
