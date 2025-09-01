// Calendar URL regex
const calendarRegex = /^(\/.+)?\/calendar/
// Compose URL regex
const composeRegex = /^\/compose(\/(?<areaId>\d+))?/
// Directory URL regex
const directoryRegex = /^\/(d|directory)(\/.*)?$/
// Forum URL regex
const forumRegex = /^(\/.+)?\/forum/
// Posts URL regex - matches /posts
const postsRegex = /^\/posts/
// Area Post URL regex - matches /:area_name/post/:post_id
const areaPostRegex = /^\/.+\/post\/.+/
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
  areaPostRegex,
  postSubmittedRegex,
  searchRegex,
}
