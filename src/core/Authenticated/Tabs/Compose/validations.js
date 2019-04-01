import * as yup from 'yup'
import isAfter from 'date-fns/is_after'
import isDate from 'date-fns/is_date'

export const validations = yup.object().shape({
  forums: yup
    .array()
    .required()
    .min(1),
  category: yup.object().required(),
  profile: yup
    .number()
    .required()
    .min(
      1,
      'Ensure that you are logged into an account with at least one approved profile'
    ),
  subject: yup.string().required(),
  message: yup.string().required(),
  fromDate: yup
    .date()
    .nullable()
    .test('fromDate', 'From field must be specified for events', function(
      fromDate
    ) {
      return (
        !this.parent.category ||
        !this.parent.category.is_event ||
        isDate(fromDate)
      )
    }),
  toDate: yup
    .date()
    .nullable()
    .test('toDate', 'To field must be after From field', function(endDate) {
      return (
        !this.parent.category ||
        !this.parent.category.is_event ||
        isAfter(endDate, this.parent.fromDate)
      )
    })
})
