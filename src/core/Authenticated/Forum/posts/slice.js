import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

const initialState = {
  postsByIssue: {},
  headlinesByIssue: {},
  adsByIssue: {},
  newsFromNeighboringNfsByIssue: {}
}

export const posts = createSlice({
  slice: 'posts',
  initialState: {
    ...initialState
  },
  reducers: {
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
      }
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
  getNewsFromNeighboringNfsByIssue: createSelector(
    [path],
    posts => posts.newsFromNeighboringNfsByIssue || {}
  )
}
