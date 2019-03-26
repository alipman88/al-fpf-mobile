// this is separate from newUser because we want to persist the registration email as soon as they sign up
// so the user can request the verification email again.
import { createSlice, createSelector } from 'redux-starter-kit'

const initialState = {
  email: 'test1000@frontporchforum.com'
}

export const registrationEmail = createSlice({
  slice: 'registrationEmail',
  initialState: {
    ...initialState
  },
  reducers: {
    setRegistrationEmail: (state, { payload }) => {
      return {
        email: payload.email
      }
    }
  }
})

const path = 'main.registrationEmail'

registrationEmail.selectors = {
  ...registrationEmail.selectors,
  getRegistrationEmail: createSelector(
    [path],
    registrationEmail => registrationEmail
  )
}
