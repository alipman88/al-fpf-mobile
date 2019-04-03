import { prepareValues } from '../prepareValues'

describe('prepareValues', () => {
  test('it restructures data depending on profile type', () => {
    const values = planType => ({
      profilePlan: { plan_type: planType },
      business: {
        businessCategoryId: 3
      },
      government: {
        tellUsMore: 'some text'
      },
      address: {
        streetName: 'Test St'
      }
    })

    const neighbor = values('neighbor')
    const business = values('business')
    const government = values('government')

    expect(prepareValues(neighbor)).toEqual({
      user: {
        profile: {
          profile_plan: { plan_type: 'neighbor' },
          street_name: 'Test St'
        }
      }
    })

    expect(prepareValues(business)).toEqual({
      user: {
        profile: {
          profile_plan: { plan_type: 'business' },
          business_category_id: 3,
          street_name: 'Test St'
        }
      }
    })

    expect(prepareValues(government)).toEqual({
      user: {
        profile: {
          profile_plan: { plan_type: 'government' },
          tell_us_more: 'some text',
          street_name: 'Test St'
        }
      }
    })
  })
})
