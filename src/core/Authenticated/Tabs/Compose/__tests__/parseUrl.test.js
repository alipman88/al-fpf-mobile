import { composeRegex, composePathParams } from '../parseUrl'

describe('parseUrl', () => {
  describe('composeRegex', () => {
    test('it matches compose URLs', () => {
      expect(composeRegex.test('/compose')).toBeTruthy()
      expect(composeRegex.test('/compose?title=foo')).toBeTruthy()
      expect(composeRegex.test('/compose/123')).toBeTruthy()
    })
  })

  describe('composePathParams', () => {
    test('it extracts params from compose URLs', () => {
      expect(composePathParams('/compose/')).toEqual({})
      expect(composePathParams('/compose/4')).toEqual({ areaId: 4 })

      const url =
        '/compose?area_id=1&category_id=2&post[parent_post_id]=3&post[referenced_profile_id]=4&post[title]=foo&other=bar'
      expect(composePathParams(url)).toEqual({
        areaId: 1,
        categoryId: 2,
        parentPostId: 3,
        referencedProfileId: 4,
        title: 'foo',
      })
    })

    test('it returns null for non-compose URLs', () => {
      expect(composePathParams('/areas/1/posts')).toBeNull()
    })
  })
})
