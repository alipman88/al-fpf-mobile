import { createSlice, createSelector } from 'redux-starter-kit'
import capitalize from 'lodash/capitalize'

export const appMessage = createSlice({
  initialState: {
    message: '',
    type: ''
  },
  reducers: {
    setAppError: (_, { payload }) => ({
      message: capitalize(payload),
      type: 'danger'
    }),
    setAppMessage: (_, { payload }) => ({
      message: capitalize(payload.message),
      type: payload.type
    })
  }
})

appMessage.selectors = {
  getMessage: createSelector(
    ['main.appMessage'],
    appMessage => appMessage.message
  ),
  getMessageType: createSelector(
    ['main.appMessage'],
    appMessage => appMessage.type
  )
}
