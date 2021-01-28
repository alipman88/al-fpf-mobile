import { profile } from '../slice'

describe('profile - slice', () => {
  test('initialState has a user with an empty profile array', () => {
    const state = profile.reducer(undefined, {})
    expect(state).toEqual({
      user: {
        profiles: [],
      },
      loading: false,
      currentProfileId: undefined,
    })
  })

  describe('setLoading', () => {
    test('sets loading state', () => {
      const state = profile.reducer(undefined, profile.actions.setLoading(true))
      const data = profile.selectors.getLoading({
        main: {
          profile: state,
        },
      })

      expect(data).toEqual(true)
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
              business_category_id: 100,
              approved: true,
            },
            {
              id: 4,
              approved: false,
            },
          ],
        })
      )

      let data = profile.selectors.getUser({
        main: {
          profile: state,
        },
      })

      expect(data).toEqual({
        id: 1,
        profiles: [
          {
            id: 3,
            business_category_id: 100,
            approved: true,
          },
          {
            id: 4,
            approved: false,
          },
        ],
      })

      data = profile.selectors.getProfiles({
        main: {
          profile: state,
        },
      })

      expect(data).toEqual([
        {
          id: 3,
          business_category_id: 100,
          approved: true,
        },
        {
          id: 4,
          approved: false,
        },
      ])
    })
  })

  describe('setValueInUserData', () => {
    test('updates a single value in the user object', () => {
      let state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [],
          name: 'test',
        })
      )

      state = profile.reducer(
        state,
        profile.actions.setValueInUserData({
          key: 'email',
          value: 'test@example.com',
        })
      )

      expect(state).toEqual({
        loading: false,
        currentProfileId: undefined,
        user: {
          id: 1,
          profiles: [],
          name: 'test',
          email: 'test@example.com',
        },
      })
    })
  })

  describe('setValueInProfileData', () => {
    test('updates a single value in the users profile array', () => {
      let state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            {
              id: 1,
            },
          ],
          name: 'test',
        })
      )

      state = profile.reducer(
        state,
        profile.actions.setValueInProfileData({
          1: {
            foo: 'bar',
          },
        })
      )

      expect(state).toEqual({
        loading: false,
        currentProfileId: undefined,
        user: {
          id: 1,
          profiles: [
            {
              id: 1,
              foo: 'bar',
            },
          ],
          name: 'test',
        },
      })
    })
  })

  describe('getProfiles selector', () => {
    test('returns an empty array when there is no property', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
        })
      )

      const data = profile.selectors.getProfiles({
        main: {
          profile: state,
        },
      })

      expect(data).toEqual([])
    })
  })

  describe('getAvailableProfiles selector', () => {
    test('returns only approved profiles', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            { id: 5, approved: true },
            { id: 6, approved: false },
            { id: 7 },
          ],
        })
      )

      const data = profile.selectors.getAvailableProfiles({
        main: {
          profile: state,
        },
      })

      expect(data).toEqual([{ id: 5, approved: true }])
    })
  })

  describe('getCurrentProfile selector', () => {
    test('can get both the ID & the profile object', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            { id: 5 },
            {
              id: 3,
              approved: true,
            },
          ],
        })
      )

      expect(
        profile.selectors.getCurrentProfileId({
          main: {
            profile: state,
          },
        })
      ).toEqual(3)

      expect(
        profile.selectors.getCurrentProfile({
          main: {
            profile: state,
          },
        })
      ).toEqual({ id: 3, approved: true })
    })
  })

  describe('setCurrentProfileId', () => {
    test('overrides the currentProfileId', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setCurrentProfileId(105)
      )
      expect(
        profile.selectors.getCurrentProfileId({
          main: {
            profile: state,
          },
        })
      ).toEqual(105)
    })
  })

  describe('getUserHasAppleSubscription', () => {
    test('checks whether the user has an Apple subscription - none', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [{ id: 5, approved: true }],
        })
      )

      expect(
        profile.selectors.getUserHasAppleSubscription({
          main: { profile: state },
        })
      ).toEqual(false)
    })

    test('checks whether the user has an Apple subscription - stripe', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            {
              id: 5,
              approved: true,
              active_subscription: { service: 'stripe' },
            },
          ],
        })
      )

      expect(
        profile.selectors.getUserHasAppleSubscription({
          main: { profile: state },
        })
      ).toEqual(false)
    })

    test('checks whether the user has an Apple subscription - apple', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            { id: 5, approved: true },
            {
              id: 6,
              approved: true,
              active_subscription: { service: 'apple' },
            },
          ],
        })
      )

      expect(
        profile.selectors.getUserHasAppleSubscription({
          main: { profile: state },
        })
      ).toEqual(true)
    })
  })

  describe('getSubscriptionState', () => {
    test('get subscription state for all profiles without Apple sub', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            {
              id: 5,
              approved: true,
              profile_plan: { plan_type: 'neighbor', has_upgrades: false },
            },
            {
              id: 6,
              approved: true,
              profile_plan: { plan_type: 'business', has_upgrades: true },
            },
            {
              id: 7,
              approved: true,
              active_subscription: { service: 'stripe' },
            },
          ],
        })
      )

      expect(
        profile.selectors.getSubscriptionState({
          main: { profile: state },
        })
      ).toEqual({
        5: {
          canSubscribe: false,
          hasSubscription: false,
          hasAppleSubscription: false,
        },
        6: {
          canSubscribe: true,
          hasSubscription: false,
          hasAppleSubscription: false,
        },
        7: {
          canSubscribe: false,
          hasSubscription: true,
          hasAppleSubscription: false,
        },
      })
    })

    test('get subscription state for all profiles with Apple sub', () => {
      const state = profile.reducer(
        undefined,
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            { id: 5, approved: true, profile_plan: { plan_type: 'neighbor' } },
            { id: 6, approved: true, profile_plan: { plan_type: 'business' } },
            {
              id: 7,
              approved: true,
              active_subscription: { service: 'apple' },
            },
          ],
        })
      )

      expect(
        profile.selectors.getSubscriptionState({
          main: { profile: state },
        })
      ).toEqual({
        5: {
          canSubscribe: false,
          hasSubscription: false,
          hasAppleSubscription: false,
        },
        6: {
          canSubscribe: false,
          hasSubscription: false,
          hasAppleSubscription: false,
        },
        7: {
          canSubscribe: false,
          hasSubscription: true,
          hasAppleSubscription: true,
        },
      })
    })
  })
})
