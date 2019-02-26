import { createSlice, createSelector } from 'redux-starter-kit'

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
