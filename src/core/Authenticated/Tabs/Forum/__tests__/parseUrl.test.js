import { isIssuePath, issuePathParams } from '../parseUrl'

describe('parseUrl', () => {
  describe('isIssuePath', () => {
    test('it matches issue URLs', () => {
      expect(isIssuePath('/fivesisters/forum/archive/1')).toBeTruthy()
      expect(isIssuePath('/fivesisters/forum/archive/1#post=1232')).toBeTruthy()
      expect(isIssuePath('/123/forum/archive/123')).toBeTruthy()
      expect(isIssuePath('/123/forum/archive/123#post=1232')).toBeTruthy()
      expect(isIssuePath('/areas/1/issues/1')).toBeTruthy()
      expect(isIssuePath('/areas/1/issues/1#post=1232')).toBeTruthy()

      expect(isIssuePath('/areas/1/posts/new')).toBeFalsy()
      expect(isIssuePath('/fivesisters')).toBeFalsy()
      expect(isIssuePath('/fivesisters/calendar')).toBeFalsy()
    })
  })

  describe('issuePathParams', () => {
    test('it extracts params from issue URLs', () => {
      expect(issuePathParams('/fivesisters/forum/archive/23')).toEqual({
        areaId: undefined,
        areaSlug: 'fivesisters',
        issueNum: 23,
      })

      expect(issuePathParams('/1/forum/archive/23')).toEqual({
        areaId: 1,
        areaSlug: undefined,
        issueNum: 23,
      })

      expect(issuePathParams('/areas/1/issues/23')).toEqual({
        areaId: 1,
        areaSlug: undefined,
        issueNum: 23,
      })
    })

    test('it returns null for non-issue URLs', () => {
      expect(issuePathParams('/areas/1/posts')).toBeNull()
    })
  })
})
