import { createSlice, createSelector } from 'redux-starter-kit'
import { isObject } from 'lodash'

import { resetAction } from '@common/resetAction'

const initialState = {
  profileId: undefined,
  purchasing: false,
}

export const purchases = createSlice({
  slice: 'purchases',
  initialState: { ...initialState },
  reducers: {
    setPurchasing: (state, { payload }) => ({
      ...state,
      profileId: isObject(payload) ? payload.profileId : undefined,
      purchasing: false !== payload,
    }),
  },
  extraReducers: {
    [resetAction]: () => ({ ...initialState }),
  },
})

const path = 'main.purchases'

purchases.selectors = {
  ...purchases.selectors,

  getPurchasing: createSelector([path], (state) => state.purchasing),

  getProfileId: createSelector([path], (state) => state.profileId),
}
