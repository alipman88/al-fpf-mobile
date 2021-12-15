import { issueRegex, issuePathParams } from '../parseUrl'

describe('parseUrl', () => {
  describe('issueRegex', () => {
    test('it matches issue URLs', () => {
      expect(issueRegex.test('/areas/1/issues/1')).toBeTruthy()
      expect(issueRegex.test('/areas/1/issues/1#post=1232')).toBeTruthy()

      expect(issueRegex.test('/areas/1/posts/new')).toBeFalsy()
    })
  })

  describe('issuePathParams', () => {
    test('it extracts params from issue URLs', () => {
      expect(issuePathParams('/areas/1/issues/23')).toEqual({
        areaId: 1,
        issueNum: 23,
      })
    })

    test('it returns null for non-issue URLs', () => {
      expect(issuePathParams('/areas/1/posts')).toBeNull()
    })
  })
})
