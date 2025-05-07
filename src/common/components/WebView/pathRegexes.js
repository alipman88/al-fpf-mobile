// Calendar URL regex
const calendarRegex = /^(\/.+)?\/calendar/
// Compose URL regex
const composeRegex = /^\/compose(\/(?<areaId>\d+))?/
// Directory URL regex
const directoryRegex = /^\/(d|directory)(\/.*)?$/
// Forum URL regex
const forumRegex = /^(\/.+)?\/forum/
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
  postSubmittedRegex,
  searchRegex,
}
