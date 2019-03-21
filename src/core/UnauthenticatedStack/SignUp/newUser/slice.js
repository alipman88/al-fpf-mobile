import { createSlice, createSelector } from 'redux-starter-kit'

const initialState = {
  profileType: 'neighbor'
}

export const newUser = createSlice({
  slice: 'newUser',
  initialState,
  reducers: {
    setNewUserByKey: (state, { payload }) => {
      const { key, value } = payload
      return {
        ...state,
        [key]: value
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
