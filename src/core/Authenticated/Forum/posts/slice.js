import { createSlice, createSelector } from 'redux-starter-kit'

export const posts = createSlice({
  slice: 'posts',
  initialState: {
    postsByIssue: {}
  },
  reducers: {
    setPostsForIssue: (state, action) => ({
      ...state,
      postsByIssue: {
        ...state.postsByIssue,
        [action.payload.issueNumber]: action.payload.posts
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
  )
}
