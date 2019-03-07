import get from 'lodash/get'
import { profileTypes } from '../types/profileTypes'

export const getProfileDisplayName = (profile = {}) => {
  const planType = get(profile, 'profile_plan.plan_type')

  switch (planType) {
    case profileTypes.NEIGHBOR:
      return `Neighbor: ${profile.street_number} ${profile.street_name} ${
        profile.city
      }`
    case profileTypes.BUSINESS:
      return `Business: ${profile.name}`
    case profileTypes.GOVERNMENT:
      return `Government: ${profile.name} ${profile.jurisdiction}`
    default:
      return profile.name
  }
}
