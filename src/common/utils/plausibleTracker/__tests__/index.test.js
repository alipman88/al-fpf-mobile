import Plausible from '../index'

describe('Plausible', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('trackEvent', () => {
    test('calls fetch', async () => {
      const plausible = Plausible({ domain: 'staging.frontporchforum.com' })
      await plausible.trackEvent('login', {
        url: 'https://staging.frontporchforum.com/test',
      })

      const expectedData = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Safari',
        },
        body: '{"n":"login","u":"https://staging.frontporchforum.com/test","d":"staging.frontporchforum.com","r":null,"w":1334}',
      }

      expect(fetch.mock.calls.length).toEqual(1)

      const fetchCall = fetch.mock.calls[0]
      const fetchUrl = fetchCall[0]
      const fetchData = fetchCall[1]
      expect(fetchUrl).toEqual('https://plausible.io/api/event')
      expect(fetchData.method).toEqual(expectedData.method)
      expect(fetchData.headers).toEqual(expectedData.headers)
      expect(fetchData.body).toEqual(expectedData.body)
    })
  })

  describe('trackPageview', () => {
    test('calls fetch', async () => {
      const plausible = Plausible({ domain: 'staging.frontporchforum.com' })
      await plausible.trackPageview({ path: 'test' })

      const expectedData = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Safari',
        },
        body: '{"n":"pageview","u":"https://staging.frontporchforum.com/test","d":"staging.frontporchforum.com","r":null,"w":1334}',
      }

      expect(fetch.mock.calls.length).toEqual(1)

      const fetchCall = fetch.mock.calls[0]
      const fetchUrl = fetchCall[0]
      const fetchData = fetchCall[1]
      expect(fetchUrl).toEqual('https://plausible.io/api/event')
      expect(fetchData.method).toEqual(expectedData.method)
      expect(fetchData.headers).toEqual(expectedData.headers)
      expect(fetchData.body).toEqual(expectedData.body)
    })
  })
})
