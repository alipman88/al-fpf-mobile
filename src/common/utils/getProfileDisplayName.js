import get from 'lodash/get'
import { profileTypes } from '../types/profileTypes'

export const getProfileDisplayName = (profile = {}, withPrefix = true) => {
  const planType = get(profile, 'profile_plan.plan_type')

  switch (planType) {
    case profileTypes.NEIGHBOR:
      return `${withPrefix ? 'Neighbor: ' : ''}${profile.street_number} ${
        profile.street_name
      } ${profile.city}`
    case profileTypes.BUSINESS:
      return `${withPrefix ? 'Business: ' : ''}${profile.name}`
    case profileTypes.GOVERNMENT:
      return `${withPrefix ? 'Government: ' : ''}${profile.name} ${
        profile.jurisdiction
      }`
    default:
      return profile.name
  }
}
