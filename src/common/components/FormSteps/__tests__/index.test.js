import React from 'react'
import { shallow } from 'enzyme'
import pick from 'lodash/pick'

import { FormSteps } from '../index'

import { Step } from '../styledComponents'

describe('FormSteps', () => {
  test('with 4 steps and 2 as current, it should render 4 steps with the right props', () => {
    const wrapper = shallow(<FormSteps steps={4} currentStep={2} />)

    const steps = wrapper.find(Step)
    expect(pick(steps.at(0).props(), ['active', 'done'])).toEqual({
      active: false,
      done: true
    })

    expect(pick(steps.at(1).props(), ['active', 'done'])).toEqual({
      active: true,
      done: false
    })

    expect(pick(steps.at(2).props(), ['active', 'done'])).toEqual({
      active: false,
      done: false
    })

    expect(pick(steps.at(3).props(), ['active', 'done'])).toEqual({
      active: false,
      done: false
    })
  })
})
