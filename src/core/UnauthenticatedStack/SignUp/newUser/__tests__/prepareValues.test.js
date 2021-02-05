import { prepareValues } from '../prepareValues'

describe('prepareValues', () => {
  test('it restructures data depending on profile type', () => {
    const values = (planType) => ({
      profilePlan: { id: 4, plan_type: planType },
      termsOfUse: true,
      showInBusinessDirectory: true,
      business: {
        businessCategoryId: 3,
      },
      government: {
        notes: 'some text',
      },
      address: {
        streetName: 'Test St',
      },
      waitlist: {
        comment: 'some comment',
        reference: 'some reference',
      },
    })

    const neighbor = values('neighbor')
    const business = values('business')
    const government = values('government')

    expect(prepareValues(neighbor)).toEqual({
      user: {
        terms_of_use: true,
        profile: {
          profile_plan_id: 4,
          street_name: 'Test St',
          show_in_business_directory: true,
        },
      },
    })

    expect(prepareValues(business)).toEqual({
      user: {
        terms_of_use: true,
        profile: {
          profile_plan_id: 4,
          business_category_id: 3,
          street_name: 'Test St',
          show_in_business_directory: true,
        },
      },
    })

    expect(prepareValues(government)).toEqual({
      user: {
        terms_of_use: true,
        profile: {
          profile_plan_id: 4,
          notes: 'some text',
          street_name: 'Test St',
          show_in_business_directory: true,
        },
      },
    })
  })
})
