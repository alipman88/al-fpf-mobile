// Common code for mail app selection

export class EmailException {
  constructor(message) {
    this.message = message
    this.name = 'EmailException'
  }
}

/**
 * Parses the given mailto url into an object with keys for the mailto parts, e.g.
 * "mailto:foo@bar.com?subject=Hi" returns:
 *  { email: "foo@bar.com", suject: "Hi" }
 *
 * @param {String} url - mailto url
 * @return {Object | null}
 */
export function parseMailto(url) {
  if (!url) return null

  try {
    const urlObject = new URL(url)
    if (urlObject.protocol !== 'mailto:') {
      return null
    }

    const email = urlObject.pathname
    const params = new URLSearchParams(urlObject.search)
    const subject = params.get('subject')
    const body = params.get('body')

    const parsed = {}
    if (email) parsed.email = email
    if (subject) parsed.subject = subject
    if (body) parsed.body = body

    return parsed
  } catch (e) {
    console.error(`Invalid mailto URL: ${e}`)
    return null
  }
}
