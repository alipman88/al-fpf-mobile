import queryString from 'query-string'

export const parseURL = (url) => {
  const result = /.*[/.]frontporchforum.com(.*)/.exec(url)
  return result ? result[1] : null
}

export const parseDeepLink = (url) => {
  let route
  let params = {}

  const path = parseURL(url)
  if (path) {
    if (/posts\/new/.test(path)) {
      route = 'Compose'
      const queryParams = queryString.parseUrl(url, { parseNumbers: true })
        .query
      const parentPostId = queryParams['post[parent_post_id]']
      // LATER: it would be nice to get the parent post title and area id here
      // or in the Compose view
      params = { shouldResetForm: true, parentPostId }
    } else if (/^\/areas\/[0-9]+\/issues\/[0-9]+\/shared/.test(path)) {
      const [areaId, issueNum] = path
        .split('/')
        .filter((num) => !!parseInt(num))
      route = 'Forum'
      params = { areaId, issueNum }
    } else {
      return false
    }
  } else {
    return false
  }

  return { route, params }
}
