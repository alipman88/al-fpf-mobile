import { products } from '../slice'

describe('products - slice', () => {
  test('initialState', () => {
    const state = products.reducer(undefined, {})
    expect(state).toEqual({
      products: [],
      loading: false,
    })
  })

  test('set and get loading state', () => {
    const state = products.reducer(undefined, products.actions.setLoading(true))

    const data = products.selectors.getLoading({
      main: {
        products: state,
      },
    })

    expect(data).toEqual(true)
  })

  test('set and get the products object', () => {
    const state = products.reducer(
      undefined,
      products.actions.setProducts([1, 2])
    )

    const data = products.selectors.getProducts({
      main: {
        products: state,
      },
    })

    expect(data).toEqual([1, 2])
  })
})
