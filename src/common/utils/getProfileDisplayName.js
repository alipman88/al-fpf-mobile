import get from 'lodash/get'
import { profileTypes } from '../types/profileTypes'

export const getProfileDisplayName = (profile = {}) => {
  const planType = get(profile, 'profile_plan.plan_type')

  switch (planType) {
    case profileTypes.NEIGHBOR:
      return `${profile.street_number} ${profile.street_name} ${profile.city}`
    case profileTypes.BUSINESS:
      return profile.name
    case profileTypes.GOVERNMENT:
      return `${profile.name} ${profile.jurisdiction}`
    default:
      return profile.name
  }
}
