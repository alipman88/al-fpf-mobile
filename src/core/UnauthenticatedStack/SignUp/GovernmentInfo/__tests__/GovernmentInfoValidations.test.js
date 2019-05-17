import { validateGovernmentFieldPresence } from '../validations'

describe('GovernmentInfo validations', () => {
  test('it validates government field', () => {
    expect(validateGovernmentFieldPresence('test123!')).toEqual(true)
    expect(validateGovernmentFieldPresence('123!test')).toEqual(true)
    expect(validateGovernmentFieldPresence('123test!')).toEqual(true)

    expect(validateGovernmentFieldPresence('    ')).toEqual(false)
    expect(validateGovernmentFieldPresence('.')).toEqual(false)
  })
})
