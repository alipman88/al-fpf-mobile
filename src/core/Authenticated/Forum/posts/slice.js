import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

export const posts = createSlice({
  slice: 'posts',
  initialState: {
    postsByIssue: {},
    headlinesByIssue: {},
    adsByIssue: {}
  },
  reducers: {
    setPostsForIssue: (state, { payload }) => ({
      ...state,
      postsByIssue: {
        ...state.postsByIssue,
        [payload.issueNumber]: payload.posts
      },
      headlinesByIssue: {
        ...state.headlinesByIssue,
        [payload.issueNumber]: payload.headlines
      },
      adsByIssue: {
        ...state.adsByIssue,
        [payload.issueNumber]: payload.ads
      }
    })
  },
  extraReducers: {
    [resetAction]: () => ({ postsByIssue: {}, headlinesByIssue: {} })
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
  )
}
