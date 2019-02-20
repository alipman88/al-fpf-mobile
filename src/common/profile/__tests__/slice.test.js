import { profile } from '../slice'

describe('profile - slice', () => {
  test('initialState has a user with an empty profile array', () => {
    const state = profile.reducer(undefined, {})
    expect(state).toEqual({
      user: {
        profiles: []
      }
    })
  })

  describe('setUserProfile', () => {
    test('sets the user profile object', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            {
              id: 3,
              business_category_id: 100
            }
          ]
        })
      )

      let data = profile.selectors.getUser({
        main: {
          profile: state
        }
      })

      expect(data).toEqual({
        id: 1,
        profiles: [
          {
            id: 3,
            business_category_id: 100
          }
        ]
      })

      data = profile.selectors.getProfiles({
        main: {
          profile: state
        }
      })

      expect(data).toEqual([
        {
          id: 3,
          business_category_id: 100
        }
      ])
    })
  })

  describe('getProfiles selector', () => {
    test('returns an empty array when there is no property', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          user: {
            id: 1
          }
        })
      )

      const data = profile.selectors.getProfiles({
        main: {
          profile: state
        }
      })

      expect(data).toEqual([])
    })
  })
})
