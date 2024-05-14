import { createSlice, createSelector } from 'redux-starter-kit'
import { omit, without } from 'lodash'

import { resetAction } from '@common/resetAction'

const initialState = {
  postsByIssue: {},
  sharedPostsByIssue: {},
  headlinesByIssue: {},
  adsByIssue: {},
  featuredAdCampaignsByIssue: {},
  placementDateByIssue: {},
  newsFromNeighboringNfsByIssue: {},
  ocmMessageByIssue: {},
  forumMessageByIssue: {},
  loading: false,
}

export const posts = createSlice({
  slice: 'posts',
  initialState: {
    ...initialState,
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    setContentsForIssue: (state, { payload }) => ({
      ...state,
      postsByIssue: {
        ...state.postsByIssue,
        [payload.issueId]: payload.posts,
      },
      sharedPostsByIssue: {
        ...state.sharedPostsByIssue,
        [payload.issueId]: payload.sharedPosts,
      },
      headlinesByIssue: {
        ...state.headlinesByIssue,
        [payload.issueId]: payload.headlines,
      },
      adsByIssue: {
        ...state.adsByIssue,
        [payload.issueId]: payload.ads,
      },
      featuredAdCampaignsByIssue: {
        ...state.featuredAdCampaignsByIssue,
        [payload.issueId]: payload.featuredAdCampaign,
      },
      placementDateByIssue: {
        ...state.placementDateByIssue,
        [payload.issueId]: payload.placementDate,
      },
      newsFromNeighboringNfsByIssue: {
        ...state.newsFromNeighboringNfsByIssue,
        [payload.issueId]: payload.newsFromNeighboringNfs,
      },
      ocmMessageByIssue: {
        ...state.ocmMessageByIssue,
        [payload.issueId]: payload.ocmMessage,
      },
      forumMessageByIssue: {
        ...state.forumMessageByIssue,
        [payload.issueId]: payload.forumMessage,
      },
      loading: false,
    }),
    setAdsForIssue: (state, { payload }) => ({
      ...state,
      adsByIssue: {
        ...state.adsByIssue,
        [payload.issueId]: payload.ads,
      },
      placementDateByIssue: {
        ...state.placementDateByIssue,
        [payload.issueId]: payload.placementDate,
      },
      loading: false,
    }),
    /**
     * Remove posts and related content for issue ids that are not present in
     * the payload's exceptIssueIds array.
     */
    expire: (state, { payload }) => {
      const exceptIssueIds = payload.exceptIssueIds.map((i) => i.toString())
      const omitExpiredIssues = (byIssue) =>
        omit(byIssue, without(Object.keys(byIssue), ...exceptIssueIds))

      return {
        ...state,
        postsByIssue: omitExpiredIssues(state.postsByIssue),
        sharedPostsByIssue: omitExpiredIssues(state.sharedPostsByIssue),
        headlinesByIssue: omitExpiredIssues(state.headlinesByIssue),
        adsByIssue: omitExpiredIssues(state.adsByIssue),
        featuredAdCampaignsByIssue: omitExpiredIssues(
          state.featuredAdCampaignsByIssue,
        ),
        placementDateByIssue: omitExpiredIssues(state.placementDateByIssue),
        newsFromNeighboringNfsByIssue: omitExpiredIssues(
          state.newsFromNeighboringNfsByIssue,
        ),
        ocmMessageByIssue: omitExpiredIssues(state.ocmMessageByIssue),
        forumMessageByIssue: omitExpiredIssues(state.forumMessageByIssue),
      }
    },
  },
  extraReducers: {
    [resetAction]: () => ({
      ...initialState,
    }),
  },
})

const path = 'main.posts'

posts.selectors = {
  ...posts.selectors,
  getPostsByIssue: createSelector([path], (posts) => posts.postsByIssue),
  getSharedPostsByIssue: createSelector(
    [path],
    (posts) => posts.sharedPostsByIssue,
  ),
  getHeadlinesByIssue: createSelector(
    [path],
    (posts) => posts.headlinesByIssue,
  ),
  getAdsByIssue: createSelector([path], (posts) => posts.adsByIssue),
  getFeaturedAdCampaignsByIssue: createSelector(
    [path],
    (posts) => posts.featuredAdCampaignsByIssue || {},
  ),
  getPlacementDateByIssue: createSelector(
    [path],
    (posts) => posts.placementDateByIssue,
  ),
  getLoading: createSelector([path], (posts) => posts.loading),
  getNewsFromNeighboringNfsByIssue: createSelector(
    [path],
    (posts) => posts.newsFromNeighboringNfsByIssue || {},
  ),
  getOcmMessageByIssue: createSelector(
    [path],
    (posts) => posts.ocmMessageByIssue || {},
  ),
  getForumMessageByIssue: createSelector(
    [path],
    (posts) => posts.forumMessageByIssue || {},
  ),
}
