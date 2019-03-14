import { parseDeepLink, parseURL } from '../parseDeepLink'

describe('parseDeepLink', () => {
  const baseURL =
    'http://t.frontporchforum.com/l/abc/xyz@fpf.mailer.postageapp.com/-/frontporchforum.com'

  describe('parseURL', () => {
    test('it strips tracking link and base url', () => {
      const path = '/areas/1/posts/new'
      const url = baseURL + path

      const result = parseURL(url)
      expect(result).toEqual(path)
    })
  })

  describe('parseDeepLink', () => {
    test('it gets correct route name for a new post url', () => {
      const url = baseURL + '/areas/1/posts/new'
      const result = parseDeepLink(url)

      expect(result.route).toEqual('Compose')
      expect(result.params).toEqual({})
    })

    test('it gets correct route name and params for an issue link', () => {
      const url = baseURL + '/areas/10/issues/20/shared'
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
