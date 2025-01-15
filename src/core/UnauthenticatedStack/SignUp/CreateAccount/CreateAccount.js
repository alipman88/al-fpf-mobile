import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'

import { profileTypes } from '@fpf/common/types/profileTypes'
import { getStepCount } from '../getStepCount'

import { FullScreenWizard } from '@fpf/components/FullScreenWizard'

import { CheckboxField } from './CheckboxField'

import { CreateAccountWrapper } from './styledComponents'
import { FormHeader, BottomPadding } from '../styledComponents'

export class CreateAccount extends React.Component {
  state = {
    options: [
      {
        type: 'termsOfUse',
        value: false,
        text: 'I accept Front Porch Forum’s Terms of Use',
      },
      {
        type: 'postIntro',
        value: true,
        text: 'Introduce me to the members of my neighborhood forum',
      },
      {
        type: 'isNfBooster',
        value: false,
        text: 'I would like to help spread the word about my FPF to neighbors',
      },
    ],
  }

  toggleCheckbox = (type, value) => {
    const options = [...this.state.options]
    const option = options.find((o) => o.type === type)
    option.value = value
    options.splice(options.indexOf(option), 1, option)
    this.setState({ options })
  }

  onSubmit = async () => {
    const { navigation, setNewUserByKey, postSignUp } = this.props
    let values = {}

    this.state.options.forEach(({ type, value }) => {
      values = { ...values, [type]: value }
    })

    setNewUserByKey(values)
    await postSignUp(navigation)
  }

  componentDidMount() {
    if (
      this.props.profileType === profileTypes.BUSINESS ||
      this.props.profileType === profileTypes.NONPROFIT
    ) {
      const options = [...this.state.options]
      options.splice(
        2,
        0,
        {
          type: 'showInBusinessDirectory',
          value: true,
          text: `Include my ${this.props.profileType} in the FPF Directory`,
        },
        {
          type: 'showAddressOnBusinessDirectory',
          value: true,
          text: 'Show my street address in my Directory listing',
        },
      )
      this.setState({ options })
    }

    if (this.props.profileType === profileTypes.CANDIDATE) {
      let options = [...this.state.options]

      options = options.filter((option) => option.type !== 'postIntro')

      this.setState({ options })
    }
  }

  render() {
    const { navigation, profileType, loading } = this.props

    const nextDisabled = !this.state.options.find(
      (option) => option.type === 'termsOfUse',
    ).value

    const toggles = this.state.options.map(({ type, value, text }) => {
      return (
        <CheckboxField
          text={text}
          key={type}
          type={type}
          truthiness={value}
          onToggle={this.toggleCheckbox}
          last={type === 'isNfBooster'}
          first={type === 'termsOfUse'}
        />
      )
    })

    return (
      <FullScreenWizard
        onBackPress={() => navigation.goBack()}
        onNextPress={this.onSubmit}
        currentStep={getStepCount(profileType)}
        steps={getStepCount(profileType)}
        withPadding={false}
        topPadding={35}
        nextDisabled={nextDisabled}
        nextWidth={157}
        nextLabel='Create account'
        grey
      >
        <Spinner visible={loading} />

        <FormHeader>Last step...</FormHeader>
        <CreateAccountWrapper>{toggles}</CreateAccountWrapper>
        <BottomPadding />
      </FullScreenWizard>
    )
  }
}

CreateAccount.propTypes = {
  setNewUserByKey: PropTypes.func.isRequired,
  postSignUp: PropTypes.func.isRequired,
  profileType: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}
