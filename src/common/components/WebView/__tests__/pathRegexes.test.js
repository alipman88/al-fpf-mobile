import {
  calendarRegex,
  composeRegex,
  directoryRegex,
  forumRegex,
  postSubmittedRegex,
  searchRegex,
} from '../pathRegexes'

describe('parseUrl', () => {
  describe('calendarRegex', () => {
    test('it matches Calendar URLs', () => {
      expect(calendarRegex.test('/calendar')).toBeTruthy()
      expect(calendarRegex.test('/moretown/calendar')).toBeTruthy()
      expect(calendarRegex.test('/123/calendar')).toBeTruthy()
      expect(calendarRegex.test('/calendar/events/123')).toBeTruthy()

      expect(calendarRegex.test('/areas/1/posts/new')).toBeFalsy()
      expect(calendarRegex.test('/fivesisters')).toBeFalsy()
    })
  })

  describe('composeRegex', () => {
    test('it matches Compose URLs', () => {
      expect(composeRegex.test('/compose')).toBeTruthy()
      expect(composeRegex.test('/compose/moretown')).toBeTruthy()
      expect(composeRegex.test('/compose/123')).toBeTruthy()

      expect(composeRegex.test('/moretown')).toBeFalsy()
      expect(composeRegex.test('/areas/1/posts/new')).toBeFalsy()
      expect(composeRegex.test('/posts/new')).toBeFalsy()
    })
  })

  describe('directoryRegex', () => {
    test('it matches Directory URLs', () => {
      expect(directoryRegex.test('/directory')).toBeTruthy()
      expect(directoryRegex.test('/directory/categories')).toBeTruthy()
      expect(
        directoryRegex.test('/directory/categories/magicians'),
      ).toBeTruthy()
      expect(directoryRegex.test('/directory/favorites')).toBeTruthy()
      expect(directoryRegex.test('/d/magicians-guild')).toBeTruthy()

      expect(
        directoryRegex.test(
          '/compose?category_id=5&post[referenced_profile_id]=123',
        ),
      ).toBeFalsy()
    })
  })

  describe('forumRegex', () => {
    test('it matches Directory URLs', () => {
      expect(forumRegex.test('/forum')).toBeTruthy()
      expect(forumRegex.test('/moretown/forum')).toBeTruthy()
      expect(forumRegex.test('/moretown/forum/archive')).toBeTruthy()
      expect(forumRegex.test('/moretown/forum/archive/123')).toBeTruthy()

      expect(forumRegex.test('/moretown')).toBeFalsy()
    })
  })

  describe('postSubmittedRegex', () => {
    test('it extracts the submitted content type', () => {
      const eventSubmittedPath = '/compose?mobile_submitted_content_type=event'
      expect(
        eventSubmittedPath.match(postSubmittedRegex)?.groups?.contentType,
      ).toEqual('event')

      const postSubmittedPath = '/compose?mobile_submitted_content_type=post'
      expect(
        postSubmittedPath.match(postSubmittedRegex)?.groups?.contentType,
      ).toEqual('post')

      const eggSubmittedPath = '/compose?mobile_submitted_content_type=egg'
      expect(
        eggSubmittedPath.match(postSubmittedRegex)?.groups?.contentType,
      ).toEqual(undefined)

      const baseSubmittedPath = '/compose'
      expect(
        baseSubmittedPath.match(postSubmittedRegex)?.groups?.contentType,
      ).toEqual(undefined)
    })
  })

  describe('searcRegex', () => {
    test('it matches Search URLs', () => {
      expect(searchRegex.test('/search')).toBeTruthy()
      expect(searchRegex.test('/search?query=*')).toBeTruthy()
    })
  })
})
