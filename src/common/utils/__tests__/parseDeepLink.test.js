import { parseDeepLink, parseURL } from '../parseDeepLink'

describe('parseDeepLink', () => {
  const baseTrackingURL =
    'http://t.frontporchforum.com/l/abc/xyz@fpf.mailer.postageapp.com/-/frontporchforum.com'

  describe('parseURL', () => {
    test('it strips tracking link and base url', () => {
      const path = '/areas/1/posts/new'

      expect(parseURL('http://frontporchforum.com' + path)).toEqual(path)
      expect(parseURL('https://frontporchforum.com' + path)).toEqual(path)
      expect(parseURL('http://foo.frontporchforum.com' + path)).toEqual(path)
      expect(parseURL(baseTrackingURL + path)).toEqual(path)
    })
  })

  describe('parseDeepLink', () => {
    test('it gets correct route name for a new post url', () => {
      const url =
        baseTrackingURL + '/areas/1/posts/new?post%5Bparent_post_id%5D=123'
      const result = parseDeepLink(url)

      expect(result.route).toEqual('Compose')
      expect(result.params).toEqual({
        areaId: 1,
        shouldResetForm: true,
        parentPostId: 123,
      })
    })

    test('it gets correct route name and params for an issue link', () => {
      const url = baseTrackingURL + '/areas/10/issues/20/shared'
      const result = parseDeepLink(url)

      expect(result.route).toEqual('Forum')
      expect(result.params).toEqual({ areaId: '10', issueNum: '20' })
    })

    test('it returns false if the url is nonsense', () => {
      const url = 'http://whazzaaaaaap.crazy'
      expect(parseDeepLink(url)).toBeFalsy()
    })
  })
})
