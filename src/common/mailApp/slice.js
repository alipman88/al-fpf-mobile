import { createSlice, createSelector } from 'redux-starter-kit'

export const mailApp = createSlice({
  initialState: {
    app: null
  },
  reducers: {
    setPreferredApp: (state, action) => ({
      ...state,
      app: action.payload
    })
  }
})

const path = 'main.mailApp'

mailApp.selectors = {
  getPreferredApp: createSelector(
    [`${path}.app`],
    app => app
  )
}
