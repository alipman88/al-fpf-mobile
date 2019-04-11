import React from 'react'
import PropTypes from 'prop-types'

import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import subYears from 'date-fns/sub_years'

import { Button } from '@components/Button'
import { Post } from '@components/Post'
import { SearchHistory } from '../SearchHistory'
import { PaddingContainer } from '../styledComponents'

import {
  LoadMoreContainer,
  ResultsContainer,
  ResultCounts,
  ResultsDivider
} from './styledComponents'

export const SearchResults = ({
  categories,
  navigation,
  nextPage,
  postTruncateLength,
  total,
  search,
  searched,
  searchResults,
  setFieldTouched,
  setFieldValue,
  values
}) => {
  const numberOfVisiblePosts = Math.min(searchResults.length, total)

  return (
    <ResultsContainer>
      <PaddingContainer>
        {!searched && (
          <SearchHistory
            onEntryPress={entry => {
              setFieldValue('keyword', entry)
              setFieldTouched('keyword', true)
              search({
                keyword: entry,
                fromDate: startOfDay(subYears(new Date(), 2)),
                toDate: endOfDay(new Date()),
                forums: []
              })
            }}
          />
        )}
        {searched && searchResults.length === 0 ? (
          <React.Fragment>
            <ResultCounts>No posts found</ResultCounts>
            <ResultsDivider />
          </React.Fragment>
        ) : null}
        {searchResults.length > 0 ? (
          <React.Fragment>
            <ResultCounts>
              Displaying postings 1 - {numberOfVisiblePosts} of {total} in total
            </ResultCounts>
            <ResultsDivider />
          </React.Fragment>
        ) : null}
        {searchResults.map((post, i) => (
          <React.Fragment key={i}>
            <Post
              post={post}
              key={post.id}
              postTruncateLength={postTruncateLength}
              includeBottomButtons
              moreText={'Read'}
              showIssueData
              onTapCategory={categoryName => {
                const category = categories.find(c => c.name === categoryName)
                setFieldTouched('category', true)
                setFieldValue('category', category)
                search({ ...values, category })
              }}
              navigation={navigation}
            />
            {i < searchResults.length - 1 ? <ResultsDivider /> : null}
          </React.Fragment>
        ))}
        {searchResults.length < total ? (
          <LoadMoreContainer>
            <Button
              bgColor='#ebecf1'
              color='#999cad'
              onPress={() => {
                nextPage(values)
              }}
            >
              Load more posts
            </Button>
          </LoadMoreContainer>
        ) : null}
      </PaddingContainer>
    </ResultsContainer>
  )
}

SearchResults.propTypes = {
  categories: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  nextPage: PropTypes.func.isRequired,
  postTruncateLength: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  search: PropTypes.func.isRequired,
  searched: PropTypes.bool.isRequired,
  searchResults: PropTypes.array.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
}
