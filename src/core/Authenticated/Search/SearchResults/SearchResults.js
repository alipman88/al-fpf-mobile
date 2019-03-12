import React from 'react'
import PropTypes from 'prop-types'

import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import subYears from 'date-fns/sub_years'

import { Post } from './Post'
import { SearchHistory } from '../SearchHistory'
import { PaddingContainer } from '../styledComponents'

import {
  ResultsContainer,
  ResultCounts,
  ResultsDivider
} from './styledComponents'

export const SearchResults = ({
  minResultRange,
  pageItemCount,
  postTruncateLength,
  total,
  search,
  searched,
  searchResults,
  setFieldTouched,
  setFieldValue
}) => {
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
              Displaying postings {minResultRange} -{' '}
              {Math.min(minResultRange + pageItemCount - 1, total)} of {total}{' '}
              in total
            </ResultCounts>
            <ResultsDivider />
          </React.Fragment>
        ) : null}
        {searchResults.map(post => (
          <Post
            post={post}
            key={post.id}
            postTruncateLength={postTruncateLength}
          />
        ))}
      </PaddingContainer>
    </ResultsContainer>
  )
}

SearchResults.propTypes = {
  minResultRange: PropTypes.number.isRequired,
  pageItemCount: PropTypes.number.isRequired,
  postTruncateLength: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  search: PropTypes.func.isRequired,
  searched: PropTypes.bool.isRequired,
  searchResults: PropTypes.array.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
}
