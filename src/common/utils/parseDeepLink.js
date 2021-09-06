import {
  composeRegex,
  composePathParams,
} from '@core/Authenticated/Tabs/Compose/parseUrl'

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
      params = { shouldResetForm: true, ...composePathParams(path) }
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
