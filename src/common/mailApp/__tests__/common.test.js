import { parseMailto } from '../common'

describe('mailApp - common', () => {
  describe('parseMailto', () => {
    test('parses a mailto url', () => {
      expect(parseMailto('mailto:')).toEqual({})

      expect(parseMailto('mailto:me@bar.com')).toEqual({ email: 'me@bar.com' })

      expect(parseMailto('mailto:?subject=foo')).toEqual({ subject: 'foo' })

      expect(parseMailto('mailto:me@bar.com?subject=foobar')).toEqual({
        email: 'me@bar.com',
        subject: 'foobar',
      })

      expect(parseMailto('mailto:me@bar.com?subject=foobar&body=baz')).toEqual({
        email: 'me@bar.com',
        subject: 'foobar',
        body: 'baz',
      })
    })

    test('handles invalid content', () => {
      expect(parseMailto(null)).toEqual(null)
      expect(parseMailto('')).toEqual(null)
      expect(parseMailto('http://foo.com')).toEqual(null)
    })
  })
})
