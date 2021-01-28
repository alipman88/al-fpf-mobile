import { getProfileDisplayName } from '../getProfileDisplayName'

describe('getProfileDisplayName', () => {
  test('neighbor returns street info', () => {
    expect(
      getProfileDisplayName({
        profile_plan: {
          plan_type: 'neighbor',
        },
        street_number: 100,
        street_name: 'Yonge St',
        city: 'Toronto',
      })
    ).toEqual('Neighbor: 100 Yonge St Toronto')
  })

  test('business returns name', () => {
    expect(
      getProfileDisplayName({
        profile_plan: {
          plan_type: 'business',
        },
        name: 'Front Porch Forum',
      })
    ).toEqual('Business: Front Porch Forum')
  })

  test('government returns name + jurisdiction', () => {
    expect(
      getProfileDisplayName({
        profile_plan: {
          plan_type: 'government',
        },
        name: 'City Hall',
        jurisdiction: 'Newport',
      })
    ).toEqual('Government: City Hall Newport')
  })

  test('no plan type returns name', () => {
    expect(
      getProfileDisplayName({
        name: 'Front Porch Forum',
      })
    ).toEqual('Front Porch Forum')
  })

  test('government with no prefix returns name + jurisdiction', () => {
    expect(
      getProfileDisplayName(
        {
          profile_plan: {
            plan_type: 'government',
          },
          name: 'City Hall',
          jurisdiction: 'Newport',
        },
        false
      )
    ).toEqual('City Hall Newport')
  })
})
