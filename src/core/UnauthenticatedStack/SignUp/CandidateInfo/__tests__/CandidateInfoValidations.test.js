import { validateCandidateFieldPresence } from '../validations'

describe('CandidateInfo validations', () => {
  test('it validates candidate field', () => {
    expect(validateCandidateFieldPresence('test123!')).toEqual(true)
    expect(validateCandidateFieldPresence('123!test')).toEqual(true)
    expect(validateCandidateFieldPresence('123test!')).toEqual(true)

    expect(validateCandidateFieldPresence('    ')).toEqual(false)
    expect(validateCandidateFieldPresence('.')).toEqual(false)
  })
})
