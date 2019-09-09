import { createSlice, createSelector } from 'redux-starter-kit'
import capitalize from 'lodash/capitalize'

const initialState = {
  message: '',
  type: '',
  autoHide: false
}

export const appMessage = createSlice({
  initialState: initialState,
  reducers: {
    setAppError: (_, { payload }) => {
      const message =
        typeof payload === 'string'
          ? payload
          : Object.values(payload).join(', ')
      return {
        message: capitalize(message),
        type: 'danger'
      }
    },
    setAppMessage: (_, { payload }) => {
      return {
        message: capitalize(payload.message),
        type: payload.type,
        autoHide: payload.autoHide
      }
    },
    hideNetworkError: state =>
      state.message === 'Network error' ? initialState : state
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
  ),
  getAutoHide: createSelector(
    ['main.appMessage'],
    appMessage => appMessage.autoHide
  )
}
