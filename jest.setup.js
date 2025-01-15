import { configure } from 'enzyme'

// Enzyme is dead and does not support React 17 or 18. Use an unofficial adapater.
// https://github.com/enzymejs/enzyme/issues/2429
import Adapter from '@cfaester/enzyme-adapter-react-18'

configure({ adapter: new Adapter() })

require('jest-fetch-mock').enableMocks()

global.window = global
global.window.__TEST__ = true

jest.useFakeTimers()
