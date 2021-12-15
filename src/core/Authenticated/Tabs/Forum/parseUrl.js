/**
 * Regexp to match the issue URL
 */
const issueRegex = /^\/areas\/(?<areaId>[0-9]+)\/issues\/(?<issueNum>[0-9]+)/

/**
 * Given a path, returns an object with Forum navigation params based on the
 * params in the URL.  If the path is not a valid issue URL, returns null.
 *
 * @param {string} path, e.g. "/areas/1/issues/1"
 * @returns { Object | null }
 */
const issuePathParams = (path) => {
  const matches = path.match(issueRegex)

  if (!matches) {
    return null
  }

  const areaId = Number(matches.groups.areaId)
  const issueNum = Number(matches.groups.issueNum)

  return { areaId, issueNum }
}

export { issueRegex, issuePathParams }
