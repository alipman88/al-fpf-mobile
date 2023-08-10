import { configure } from 'enzyme'

// There's no official enzyme adapter for React 17 as of 2021-06-30.
// This package is recommended as an interim solution:
// https://github.com/enzymejs/enzyme/issues/2429
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

require('jest-fetch-mock').enableMocks()

global.window = global
global.window.__TEST__ = true

jest.useFakeTimers()
