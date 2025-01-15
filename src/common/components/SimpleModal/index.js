/**
 * Uses Modal component as a base to create text + continue button modal
 */

import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import { Modal } from '@fpf/components/Modal'
import { ModalContent, ModalContinue, ModalText } from './styledComponents'

export const SimpleModal = ({ children, dark, onClose, open }) => {
  if (!open) {
    return null
  }

  return (
    <Modal dark={dark}>
      <ModalContent>
        <ModalText>{children}</ModalText>
        <TouchableOpacity onPress={onClose}>
          <ModalContinue>Continue</ModalContinue>
        </TouchableOpacity>
      </ModalContent>
    </Modal>
  )
}

SimpleModal.propTypes = {
  children: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
