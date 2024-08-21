const issueRegex =
  /^\/(?<areaSlugOrId>[\w.-]+)\/forum\/archive\/(?<issueNum>[0-9]+)/
const issueRegexDeprecated =
  /^\/areas\/(?<areaSlugOrId>[0-9]+)\/issues\/(?<issueNum>[0-9]+)/

/**
 * Given a path, returns an object with Forum navigation params based on the
 * params in the URL.  If the path is not a valid issue URL, returns null.
 *
 * Note that the response object may contain either an areaId or an areaSlug.
 *
 * @param {string | null} path, e.g. "/fivesisters/issues/1" or "/areas/1/issues/1"
 * @returns {Object | null}
 */
const issuePathParams = (path) => {
  const matches = path?.match(issueRegex) || path?.match(issueRegexDeprecated)

  if (!matches || !matches.groups.areaSlugOrId) {
    return null
  }

  let areaId, areaSlug
  if (/\d+/.test(matches.groups.areaSlugOrId)) {
    areaId = Number(matches.groups.areaSlugOrId)
  } else {
    areaSlug = matches.groups.areaSlugOrId
  }

  const issueNum = Number(matches.groups.issueNum)

  return { areaId, areaSlug, issueNum }
}

/**
 * Returns true if the given path is for an issue.
 *
 * @param {string} path, e.g. "/fivesisters/issues/1" or "/areas/1/issues/1"
 * @returns {Boolean}
 */
const isIssuePath = (path) => !!issuePathParams(path)

export { issueRegex, issuePathParams, isIssuePath }
