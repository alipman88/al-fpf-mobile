import { createSlice, createSelector } from 'redux-starter-kit'

export const spinner = createSlice({
  slice: 'spinner',
  initialState: {
    visible: false,
  },
  reducers: {
    setVisibility: (state, { payload }) => ({
      visible: payload,
    }),
  },
})

spinner.selectors = {
  getVisible: createSelector(['main.spinner'], (spinner) => spinner.visible),
}
