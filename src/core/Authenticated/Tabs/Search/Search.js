import React from 'react'
import { Keyboard, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import get from 'lodash/get'

import subYears from 'date-fns/sub_years'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'

import { responseError } from '@common/utils/responseError'
import { validations } from './validations'
import { ScreenContainer } from '@components/ScreenContainer'
import { SearchFields } from './SearchFields'
import { SearchResults } from './SearchResults'

export class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchViewRef = React.createRef()
  }

  state = {
    categoryFromLink: null,
    loading: false,
    searched: false,
    searchResults: [],
    total: 0,
    page: 1,
    pages: 0,
    pageItemCount: 25
  }

  nextPage = values => {
    this.setState(
      state => ({ ...state, page: state.page + 1 }),
      () => {
        this.search(values)
      }
    )
  }

  componentDidMount() {
    const { navigation } = this.props

    // Set scrollToTop function in navigation params to trigger scroll in tab navigator
    this.props.navigation.setParams({
      scrollToTop: this.scrollToTop
    })

    this.setCategoryFromLink(navigation.getParam('category'))
  }

  componentDidUpdate() {
    const categoryParam = this.props.navigation.getParam('category')
    const categoryNameFromState = get(this.state.categoryFromLink, 'name')
    if (categoryParam !== categoryNameFromState) {
      this.setCategoryFromLink(categoryParam)
    }
    // Set the current searchViewRef on navigation so we can trigger scrolling from events
    // on the tab navigator
    if (this.searchViewRef !== this.props.navigation.getParam('scrollRef')) {
      this.props.navigation.setParams({
        scrollRef: this.searchViewRef
      })
    }
  }

  scrollToTop(ref, animated = true) {
    if (ref.current) {
      ref.current.scrollTo({ y: 0, animated: animated })
    }
  }

  setCategoryFromLink(categoryName) {
    const { categories } = this.props
    const categoryFromLink = categories.find(cat => cat.name === categoryName)

    this.setState({
      categoryFromLink
    })
  }

  search = values => {
    this.setState({ loading: true })

    return this.props
      .search({
        ...values,
        page: this.state.page,
        count: 25
      })
      .then(({ pagination, results }) => {
        if (values.keyword.trim().length > 0) {
          this.props.addSearchToHistory(values)
        }
        this.setState(state => ({
          searched: true,
          // add the results from the query if they are from next page
          searchResults:
            state.page === 1 ? results : state.searchResults.concat(results),
          total: pagination.total,
          page: pagination.page,
          pages: pagination.pages,
          pageItemCount: pagination.page_item_count
        }))
      })
      .catch(e => {
        this.props.setAppError(responseError(e))
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const {
      categoryFromLink,
      loading,
      searched,
      searchResults,
      total
    } = this.state
    const { areas, categories, navigation } = this.props

    return (
      <ScreenContainer grey withPadding={false}>
        <Formik
          key={this.state.key}
          initialValues={{
            fromDate: startOfDay(subYears(new Date(), 2)),
            toDate: endOfDay(new Date()),
            keyword: '',
            category: null,
            forums: []
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true)
            this.setState({ page: 1 }, () => {
              Keyboard.dismiss()
              this.search(values).finally(() => actions.setSubmitting(false))
            })
          }}
          validationSchema={validations}
          render={({
            errors,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
            isSubmitting,
            touched,
            values
          }) => (
            <ScrollView
              contentContainerStyle={{ minHeight: '100%' }}
              keyboardShouldPersistTaps='handled'
              ref={this.searchViewRef}
            >
              <SearchFields
                areas={areas}
                categories={categories}
                errors={errors}
                handleSubmit={handleSubmit}
                onClearSearch={() => this.setState({ searched: false })}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                isSubmitting={loading || isSubmitting}
                touched={touched}
                values={values}
                categoryFromLink={categoryFromLink}
              />
              <SearchResults
                categories={categories}
                navigation={navigation}
                nextPage={this.nextPage}
                total={total}
                search={this.search}
                searched={searched}
                searchResults={searchResults}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                values={values}
              />
            </ScrollView>
          )}
        />
      </ScreenContainer>
    )
  }
}

Search.propTypes = {
  addSearchToHistory: PropTypes.func.isRequired,
  areas: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  setAppError: PropTypes.func.isRequired
}
