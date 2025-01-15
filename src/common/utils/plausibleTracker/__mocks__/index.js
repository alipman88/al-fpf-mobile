// This mock is not loaded automatically.  To make use of it, call:
// jest.mock('@fpf/common/utils/plausibleTracker')
//
// https://jestjs.io/docs/manual-mocks#mocking-user-modules

const Plausible = () => ({
  trackEvent: jest.fn(),
  trackPageview: jest.fn(),
})

export default Plausible
