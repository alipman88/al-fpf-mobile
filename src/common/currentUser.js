import { createSlice } from 'redux-starter-kit'

export const currentUser = createSlice({
  slice: 'currentUser',
  initialState: {
    accessToken: null
  },
  reducers: {
    setAccessToken: (state, accessToken) => ({
      ...state,
      accessToken
    })
  }
})
