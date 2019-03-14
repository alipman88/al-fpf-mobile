import * as yup from 'yup'
import startOfDay from 'date-fns/start_of_day'
import isAfter from 'date-fns/is_after'
import isDate from 'date-fns/is_date'

export const validations = yup.object().shape({
  forums: yup
    .array()
    .required()
    .min(1),
  category: yup.object().required(),
  profile: yup.number().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
  fromDate: yup
    .date()
    .nullable()
    .min(startOfDay(new Date()), 'From field must be at today or later')
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
    .min(new Date(), 'To field must be after current date & time')
    .test('toDate', 'To field must be after From field', function(endDate) {
      return (
        !this.parent.category ||
        !this.parent.category.is_event ||
        isAfter(endDate, this.parent.fromDate)
      )
    })
})
