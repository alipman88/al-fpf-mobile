import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

global.window = global
global.window.__TEST__ = true

jest.useFakeTimers()
