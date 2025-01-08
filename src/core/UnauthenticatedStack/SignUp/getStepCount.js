import { profileTypes } from '@fpf/common/types/profileTypes'

export const getStepCount = (profileType) => {
  return profileType === profileTypes.NEIGHBOR ? 4 : 5
}
