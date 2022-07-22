import {
  composeRegex,
  composePathParams,
} from '@core/Authenticated/Tabs/Compose/parseUrl'
import {
  issueRegex,
  issuePathParams,
} from '@core/Authenticated/Tabs/Forum/parseUrl'

export const parseURL = (url) => {
  const result = /.*[/.]frontporchforum.com(.*)/.exec(url)
  return result ? result[1] : null
}

export const parseDeepLink = (url) => {
  let route
  let params = {}

  const path = parseURL(url)
  if (path) {
    if (composeRegex.test(path)) {
      route = 'Compose'
      params = composePathParams(path)
    } else if (issueRegex.test(path)) {
      route = 'Forum'
      params = issuePathParams(path)
    } else {
      return false
    }
  } else {
    return false
  }

  return { route, params }
}
