import queryString from 'query-string'
import { pickBy } from 'lodash'

/**
 * Regexp to match the post URL
 */
const composeRegex = /^\/compose(\/(?<areaId>\d+))?/

const eventCategoryId = 9

/**
 * Given a path, returns an object with Compose navigation params based on the
 * params in the URL.  If the path is not a valid new posting URL, returns null.
 *
 * @param {string} path, e.g. "/compose?post[title]=cheese"
 * @returns { Object | null }
 */
const composePathParams = (path) => {
  const queryParams = queryString.parseUrl(path, {
    parseNumbers: true,
  }).query

  const match = path.match(composeRegex)

  if (!match) {
    return null
  }

  const areaId = parseInt(match.groups.areaId) || queryParams['area_id']

  const params = {
    areaId,
    categoryId: queryParams['category_id'],
    parentPostId: queryParams['post[parent_post_id]'],
    referencedProfileId: queryParams['post[referenced_profile_id]'],
    title: queryParams['post[title]'],
  }

  if (queryParams['is_event']) {
    params.categoryId = eventCategoryId
  }

  return pickBy(params, (value) => !!value)
}

export { composeRegex, composePathParams }
