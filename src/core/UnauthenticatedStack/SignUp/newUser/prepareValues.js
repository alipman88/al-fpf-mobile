import { omit, pick } from 'lodash'
import { snakeCaseData } from '@common/utils/snakeCaseData'
import { profileTypes } from '@common/types/profileTypes'

// move additional profile fields into profile object
const additionalProfileFields = [
  'showInBusinessDirectory',
  'showAddressOnBusinessDirectory',
]

export const prepareValues = (values) => {
  let newValues = values

  // set plan type specific data as profile object
  if (
    values.profilePlan.plan_type === profileTypes.BUSINESS ||
    values.profilePlan.plan_type === profileTypes.NONPROFIT
  ) {
    newValues.profile = values[profileTypes.BUSINESS]
  } else if (values.profilePlan.plan_type === profileTypes.GOVERNMENT) {
    newValues.profile = values[profileTypes.GOVERNMENT]
  } else if (values.profilePlan.plan_type === profileTypes.CANDIDATE) {
    newValues.profile = values[profileTypes.CANDIDATE]
  }

  // set address and profile plan values in profile object
  newValues.profile = {
    ...newValues.profile,
    ...values.address,
    ...pick(newValues, additionalProfileFields),
    profilePlanId: newValues.profilePlan.id,
  }

  // remove non-user fields from outer user object
  newValues = omit(newValues, [
    profileTypes.BUSINESS,
    profileTypes.GOVERNMENT,
    profileTypes.CANDIDATE,
    'address',
    'profilePlan',
    'waitlist',
    ...additionalProfileFields,
  ])

  // snake case the attribute names
  newValues = snakeCaseData(newValues)
  newValues.profile = snakeCaseData(newValues.profile)

  return { user: newValues }
}
