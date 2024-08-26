import { getStepCount } from '../getStepCount'

describe('getStepCount', () => {
  it('returns neighbor as 4', () => {
    expect(getStepCount('neighbor')).toEqual(4)
  })

  it('returns business or government as 5', () => {
    expect(getStepCount('business')).toEqual(5)
    expect(getStepCount('government')).toEqual(5)
    expect(getStepCount('candidate')).toEqual(5)
  })
})
