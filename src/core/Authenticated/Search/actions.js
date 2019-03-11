import { appError } from '@components/AppError/slice'
import * as api from '@common/api'
import { responseError } from '@common/utils/responseError'
import queryString from 'query-string'

export const search = (values, setSubmitting, callback) => async (
  dispatch,
  getState
) => {
  setSubmitting(true)
  try {
    const response = await api.postAuthorized(
      `/posts?${queryString.stringify({
        page: values.page,
        count: values.count
      })}`,
      {
        area_ids: values.forums.length > 0 ? values.forums : undefined,
        category_ids: values.category ? [values.category] : undefined,
        from: values.fromDate,
        to: values.toDate,
        query: values.keyword
      },
      getState()
    )

    setSubmitting(false)
    callback(response.data)
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  }

  setSubmitting(false)
}
