import { snakeCase, omit } from 'lodash'
import { profileTypes } from '@common/types/profileTypes'

const snakeCaseData = data => {
  let newObj = {}
  Object.entries(data).forEach(([key, value]) => {
    newObj = { ...newObj, [snakeCase(key)]: value }
  })
  return newObj
}

export const prepareValues = values => {
  let newValues = values

  // flatten nested values if they're used, build profile
  if (values.profilePlan.plan_type === profileTypes.BUSINESS) {
    newValues.profile = snakeCaseData(values.business)
  } else if (values.profilePlan.plan_type === profileTypes.GOVERNMENT) {
    newValues.profile = snakeCaseData(values.government)
  }

  newValues.profile = {
    ...newValues.profile,
    ...snakeCaseData(values.address),
    profile_plan: newValues.profilePlan
  }

  // remove temp fields
  newValues = omit(newValues, [
    profileTypes.BUSINESS,
    profileTypes.GOVERNMENT,
    'address',
    'profilePlan'
  ])
  return {
    user: {
      ...snakeCaseData(newValues)
    }
  }
}
