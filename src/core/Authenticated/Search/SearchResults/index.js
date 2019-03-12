import React from 'react'
import PropTypes from 'prop-types'

import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import subYears from 'date-fns/sub_years'
import format from 'date-fns/format'

import { SearchHistory } from '../SearchHistory'
import { PaddingContainer } from '../styledComponents'

import {
  PostAuthor,
  PostBody,
  PostCategory,
  PostContainer,
  PostDate,
  PostHeader,
  ResultsContainer,
  ResultCounts,
  ResultsDivider
} from './styledComponents'

export const SearchResults = ({
  minResultRange,
  pageItemCount,
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
          <PostContainer key={post.id}>
            <PostHeader>{post.title}</PostHeader>
            <PostAuthor>
              {post.area_name} - No. {post.issue_number} -{' '}
              {post.user_first_name} {post.user_last_name} - {post.user_email} -{' '}
              {post.user_profile_name}
            </PostAuthor>
            {Boolean(post.event.start_date) && (
              <PostDate>
                {format(new Date(post.event.start_date), 'MM dd, YYYY')}
                {Boolean(post.event.end_date) &&
                  `- ${format(new Date(post.event.end_date), 'MM dd, YYYY')}`}
              </PostDate>
            )}
            {post.categories.map(category => (
              <PostCategory key={category}>{category}</PostCategory>
            ))}
            <PostBody>{post.content}</PostBody>
          </PostContainer>
        ))}
      </PaddingContainer>
    </ResultsContainer>
  )
}

SearchResults.propTypes = {
  minResultRange: PropTypes.number.isRequired,
  pageItemCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  search: PropTypes.func.isRequired,
  searched: PropTypes.bool.isRequired,
  searchResults: PropTypes.array.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
}
