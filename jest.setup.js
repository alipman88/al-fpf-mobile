import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Buffer } from 'buffer'
import { URL, URLSearchParams } from 'whatwg-url'

global.Buffer = Buffer
global.URL = URL
global.URLSearchParams = URLSearchParams

configure({ adapter: new Adapter() })

global.window = global

jest.useFakeTimers()
