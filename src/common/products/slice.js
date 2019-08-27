import { createSlice, createSelector } from 'redux-starter-kit'

const initialState = {
  products: [],
  loading: false
}

export const products = createSlice({
  slice: 'products',
  initialState: { ...initialState },
  reducers: {
    setLoading: (state, { payload }) => ({
      ...state,
      loading: payload
    }),

    setProducts: (state, { payload }) => ({
      ...state,
      products: payload
    })
  }
})

const path = 'main.products'

products.selectors = {
  ...products.selectors,

  getProducts: createSelector(
    [path],
    state => state.products
  ),

  getLoading: createSelector(
    [path],
    state => state.loading
  )
}
