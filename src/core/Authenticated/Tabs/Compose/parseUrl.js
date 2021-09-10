import queryString from 'query-string'
import { pickBy } from 'lodash'

/**
 * Regexp to match the post URL
 */
const composeRegex = /^\/areas\/(?<areaId>[0-9]+)\/posts\/new/

/**
 * Given a path, returns an object with Compose navigation params based on the
 * params in the URL.  If the path is not a valid new posting URL, returns null.
 *
 * @param {string} path, e.g. "/areas/1/posts/new?post[title]=cheese"
 * @returns { Object | null }
 */
const composePathParams = (path) => {
  const matches = path.match(composeRegex)

  if (!matches) {
    return null
  }

  const areaId = Number(matches.groups.areaId)
  const queryParams = queryString.parseUrl(path, {
    parseNumbers: true,
  }).query

  const params = {
    areaId,
    shouldResetForm: true,
    categoryId: queryParams['category_id'],
    parentPostId: queryParams['post[parent_post_id]'],
    referencedProfileId: queryParams['post[referenced_profile_id]'],
    title: queryParams['post[title]'],
  }

  return pickBy(params, (value) => !!value)
}

export { composeRegex, composePathParams }
