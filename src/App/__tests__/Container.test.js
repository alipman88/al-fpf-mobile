import { buildDeepLinkFromNotification } from '../Container'

describe('buildDeepLinkFromNotification', () => {
  test('returns forum url from payload object', () => {
    const payload = { area_id: 1, issue_number: 123 }
    const url = 'https://frontporchforum.com/1/forum/archive/123?cache-bust='
    expect(buildDeepLinkFromNotification({ data: { payload } })).toMatch(url)
  })

  test('returns forum url from payload JSON string', () => {
    const payload = JSON.stringify({ area_id: 1, issue_number: 123 })
    const url = 'https://frontporchforum.com/1/forum/archive/123?cache-bust='
    expect(buildDeepLinkFromNotification({ data: { payload } })).toMatch(url)
  })

  test('returns forum url from data object', () => {
    const data = { area_id: 1, issue_number: 123 }
    const url = 'https://frontporchforum.com/1/forum/archive/123?cache-bust='
    expect(buildDeepLinkFromNotification({ data })).toMatch(url)
  })

  test('returns null for bad data', () => {
    expect(buildDeepLinkFromNotification(null)).toEqual(null)
    expect(buildDeepLinkFromNotification({})).toEqual(null)
    expect(buildDeepLinkFromNotification({ data: null })).toEqual(null)
    expect(buildDeepLinkFromNotification({ data: { payload: null } })).toEqual(
      null,
    )
    expect(buildDeepLinkFromNotification({ data: { payload: {} } })).toEqual(
      null,
    )
  })
})
