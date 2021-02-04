import { createSlice, createSelector } from 'redux-starter-kit'

const initialState = {
  user: {
    // ProfileType
    profilePlan: {},
    // BasicInfo
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    // CreateAccount
    termsOfUse: false,
    postIntro: true,
    isNfBooster: false,
    // CreateAccount: business edition
    includeInDirectory: true,
    showAddress: true,
    // Waitlist
    comment: '',
    reference: '',
    // Address
    address: {
      streetNumber: null,
      streetName: '',
      aptNumber: '',
      city: '',
      state: 'VT',
      lat: 0,
      lng: 0,
      area_ids: [],
    },
    // GovernmentInfo
    government: {
      title: '',
      jurisdiction: '',
      tellUsMore: '',
    },
    // BusinessInfo
    business: {
      name: '',
      businessCategoryId: 0,
      url: '',
      phone: '',
      description: '',
    },
  },
  loading: false,
}

export const newUser = createSlice({
  slice: 'newUser',
  initialState: {
    ...initialState,
  },
  reducers: {
    setNewUserByKey: (state, { payload }) => {
      const user = { ...state.user, ...payload }
      return { ...state, user }
    },
    setLoading: (state, { payload }) => {
      return {
        ...state,
        loading: payload,
      }
    },
    clearData: () => {
      return { ...initialState }
    },
  },
})

const path = 'main.newUser'

newUser.selectors = {
  ...newUser.selectors,
  getNewUser: createSelector([path], (newUser) => newUser.user),

  getProfileType: createSelector(
    [path],
    (newUser) => newUser.user.profilePlan.plan_type
  ),

  getLoading: createSelector([path], (newUser) => newUser.loading),
}
