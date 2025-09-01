// Calendar URL regex
const calendarRegex = /^(\/.+)?\/calendar/
// Compose URL regex
const composeRegex = /^\/compose(\/(?<areaId>\d+))?/
// Directory URL regex
const directoryRegex = /^\/(d|directory)(\/.*)?$/
// Forum URL regex
const forumRegex = /^(\/.+)?\/forum/
// Posts URL regex - matches /posts and /:area_name/posts/:post_id
const postsRegex = /^(\/posts$|\/.+\/posts(\/\d+)?$)/
// Post submitted URL regex
const postSubmittedRegex =
  /(\?|&)mobile_submitted_content_type=(?<contentType>post|event)/
// Search URL regex
const searchRegex = /^\/search\/?(\?.*)?$/

export {
  calendarRegex,
  composeRegex,
  directoryRegex,
  forumRegex,
  postsRegex,
  postSubmittedRegex,
  searchRegex,
}
