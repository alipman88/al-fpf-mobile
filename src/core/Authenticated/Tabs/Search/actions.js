import format from 'date-fns/format'

import * as api from '@common/api'
import queryString from 'query-string'

export const search = values => async (dispatch, getState) => {
  const response = await api.postAuthorized(
    `/posts?${queryString.stringify({
      page: values.page,
      count: values.count
    })}`,
    {
      area_ids: values.forums.length > 0 ? values.forums : undefined,
      category_ids: values.category ? [values.category.id] : undefined,
      from: format(values.fromDate, 'YYYY-MM-DD'),
      to: format(values.toDate, 'YYYY-MM-DD'),
      query: values.keyword
    },
    getState()
  )

  return response.data
}
