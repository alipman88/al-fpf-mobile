import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

export const posts = createSlice({
  slice: 'posts',
  initialState: {
    postsByIssue: {},
    headlinesByIssue: {}
  },
  reducers: {
    setPostsForIssue: (state, action) => ({
      ...state,
      postsByIssue: {
        ...state.postsByIssue,
        [action.payload.issueNumber]: action.payload.posts
      },
      headlinesByIssue: {
        ...state.headlinesByIssue,
        [action.payload.issueNumber]: action.payload.headlines
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
  )
}
