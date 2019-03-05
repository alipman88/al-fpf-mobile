import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

const initialState = {
  postsByIssue: {},
  headlinesByIssue: {},
  adsByIssue: {}
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
  )
}
