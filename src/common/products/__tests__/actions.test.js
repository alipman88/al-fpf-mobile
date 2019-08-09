import { getProducts } from '../actions'
import { products } from '../slice'

describe('products - actions', () => {
  const dispatch = jest.fn()

  afterEach(() => {
    dispatch.mockReset()
  })

  describe('getProducts', () => {
    test('gets products', async () => {
      const productIds = ['a', 'b']

      await getProducts(productIds)(dispatch, () => ({}))

      expect(dispatch).toHaveBeenCalledWith(products.actions.setLoading(true))
      expect(dispatch).toHaveBeenCalledWith(products.actions.setLoading(false))
      expect(dispatch).toHaveBeenCalledWith(
        products.actions.setProducts(productIds)
      )
    })
  })
})
