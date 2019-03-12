import * as yup from 'yup'
import isAfter from 'date-fns/is_after'

export const validations = yup.object().shape({
  forums: yup.array(),
  category: yup.object().nullable(),
  fromDate: yup.date().required(),
  toDate: yup
    .date()
    .required()
    .test('toDate', 'End date must be after Start date', function(endDate) {
      return isAfter(endDate, this.parent.fromDate)
    }),
  keyword: yup.string().required()
})
