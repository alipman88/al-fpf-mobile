import { composeRegex, composePathParams } from '../parseUrl'

describe('parseUrl', () => {
  describe('composeRegex', () => {
    test('it matches compose URLs', () => {
      expect(composeRegex.test('/areas/1/posts/new')).toBeTruthy()
      expect(composeRegex.test('/areas/1/posts/new?title=foo')).toBeTruthy()

      expect(composeRegex.test('/areas/1/posts/edit/123')).toBeFalsy()
    })
  })

  describe('composePathParams', () => {
    test('it extracts params from compose URLs', () => {
      expect(composePathParams('/areas/1/posts/new')).toEqual({
        areaId: 1,
        shouldResetForm: true,
      })

      const url =
        '/areas/1/posts/new?category_id=2&post[parent_post_id]=3&post[referenced_profile_id]=4&post[title]=foo&other=bar'
      expect(composePathParams(url)).toEqual({
        areaId: 1,
        categoryId: 2,
        parentPostId: 3,
        referencedProfileId: 4,
        shouldResetForm: true,
        title: 'foo',
      })
    })

    test('it returns null for non-compose URLs', () => {
      expect(composePathParams('/areas/1/posts')).toBeNull()
    })
  })
})
