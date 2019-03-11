import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import Spinner from 'react-native-loading-spinner-overlay'
import FeatherIcon from 'react-native-vector-icons/Feather'

import format from 'date-fns/format'
import subYears from 'date-fns/sub_years'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'

import { validations } from './validations'
import { ScreenContainer } from '@components/ScreenContainer'
import { SearchFields } from './SearchFields'

import {
  PaddingContainer,
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

export class Search extends React.Component {
  static navigationOptions = {
    title: 'Search Postings'
  }

  state = {
    searchResults: [],
    total: 0,
    page: 1,
    pages: 0,
    pageItemCount: 25
  }

  render() {
    const { searchResults, total, page, pageItemCount } = this.state

    const minResultRange = (page - 1) * pageItemCount + 1

    return (
      <ScreenContainer grey withPadding={false}>
        <ScrollView>
          <Formik
            initialValues={{
              fromDate: startOfDay(subYears(new Date(), 2)),
              toDate: endOfDay(new Date()),
              keyword: '',
              category: null,
              forums: []
            }}
            onSubmit={async (values, actions) => {
              this.props.search(
                {
                  ...values,
                  page,
                  count: pageItemCount
                },
                actions.setSubmitting,
                ({ pagination, results }) => {
                  this.setState({
                    searchResults: results,
                    total: pagination.total,
                    page: pagination.page,
                    pages: pagination.pages,
                    pageItemCount: pagination.page_item_count
                  })
                }
              )
            }}
            validationSchema={validations}
            render={({
              errors,
              handleSubmit,
              setTouched,
              setFieldValue,
              isSubmitting,
              touched,
              values
            }) => (
              <SearchFields
                errors={errors}
                handleSubmit={handleSubmit}
                setTouched={setTouched}
                setFieldValue={setFieldValue}
                isSubmitting={isSubmitting}
                touched={touched}
                values={values}
              />
            )}
          />
          <ResultsContainer>
            <PaddingContainer>
              {searchResults.length > 0 ? (
                <React.Fragment>
                  <ResultCounts>
                    Displaying postings {minResultRange} -{' '}
                    {Math.min(minResultRange + pageItemCount - 1, total)} of{' '}
                    {total} in total
                  </ResultCounts>
                  <ResultsDivider />
                </React.Fragment>
              ) : null}
              {searchResults.map(post => (
                <PostContainer key={post.id}>
                  <PostHeader>{post.title}</PostHeader>
                  <PostAuthor>
                    {post.user_first_name} {post.user_last_name} -{' '}
                    {post.user_email} - {post.user_profile_name}
                  </PostAuthor>
                  {Boolean(post.event.start_date) && (
                    <PostDate>
                      {format(new Date(post.event.start_date), 'MM dd, YYYY')}
                      {Boolean(post.event.end_date) &&
                        `- ${format(
                          new Date(post.event.end_date),
                          'MM dd, YYYY'
                        )}`}
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
        </ScrollView>
      </ScreenContainer>
    )
  }
}

Search.propTypes = {
  search: PropTypes.func.isRequired
}
