import React from 'react'
import navigationService from '@common/utils/navigationService'
import { WebView } from '@components/WebView'
import { shallow } from 'enzyme'

describe('WebView', () => {
  const defaultProps = {
    source: {
      uri: 'https://frontporchforum.com/directory',
    },
  }

  const setState = jest.fn()
  const useStateMock = (initState) => [initState, setState]
  jest.spyOn(React, 'useState').mockImplementation(useStateMock)

  const navigateMock = (route, param) => true
  const navigation = jest
    .spyOn(navigationService, 'navigate')
    .mockImplementation(navigateMock)

  test('WebView compose post requests are intercepted', () => {
    const wrapper = shallow(<WebView {...defaultProps} />)
    wrapper.find('WebView').props().onShouldStartLoadWithRequest({
      url:
        'https://frontporchforum.com/areas/92/posts/new?category_id=5&post%5Breferenced_profile_id%5D=123&post%5Btitle%5D=Recommending+Pawnshop+Productions',
    })

    expect(navigation).toHaveBeenCalledWith('Compose', {
      categoryId: 5,
      referencedProfileId: '123',
      title: 'Recommending Pawnshop Productions',
    })
  })
})
