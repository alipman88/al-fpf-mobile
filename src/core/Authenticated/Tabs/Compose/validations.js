import * as yup from 'yup'
import isAfter from 'date-fns/is_after'
import isDate from 'date-fns/is_date'
import differenceInDays from 'date-fns/difference_in_days'

export const validations = yup.object().shape({
  forums: yup
    .array()
    .required()
    .min(1),
  category: yup
    .object()
    .nullable()
    .required(),
  profile: yup
    .number()
    .required()
    .min(
      0,
      'Ensure that you are logged into an account with at least one approved profile'
    ),
  subject: yup
    .string()
    .trim()
    .required(),
  message: yup
    .string()
    .trim()
    .required(),
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
    .test('toDate', 'To field must be after current date & time', function(
      endDate
    ) {
      return (
        !this.parent.category ||
        !this.parent.category.is_event ||
        isAfter(endDate, new Date())
      )
    })
    .test('toDate', 'To & from dates can only be up to a week apart', function(
      endDate
    ) {
      return (
        !this.parent.category ||
        !this.parent.category.is_event ||
        differenceInDays(endDate, this.parent.fromDate) <= 7
      )
    })
})
