import { createSlice, createSelector } from 'redux-starter-kit'

const initialState = {
  profileType: null,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

export const newUser = createSlice({
  slice: 'newUser',
  initialState: {
    ...initialState
  },
  reducers: {
    setNewUserByKey: (state, { payload }) => {
      return {
        ...state,
        ...payload
      }
    }
  }
})

const path = 'main.newUser'

newUser.selectors = {
  ...newUser.selectors,
  getNewUser: createSelector(
    [path],
    newUser => newUser
  )
}
