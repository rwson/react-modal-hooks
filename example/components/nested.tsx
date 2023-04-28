import React from 'react'
import { Modal, Button } from 'antd'

import { useRegisterModal, useOpenModal, useCloseModal } from '../react-modal-better-hooks/react-modal-better-hooks.esm.js'


const OutModal = (props) => {
  const { closeModal } = useCloseModal()
  const open = useOpenModal()

  return (
    <Modal {...props} onCancel={() => closeModal('out-modal')}>
      <p>I'm Out Modal</p>
      <Button onClick={() => open({
        modalId: 'child-modal'
      })}>
        Open Nested Modal
      </Button>
    </Modal>
  )
}

const ChildModal = (props) => {
  const { closeModal, closeAllModals } = useCloseModal()

  return (
    <Modal {...props} onCancel={() => closeModal('child-modal')} width="400px">
      <p>I'm Nested Modal</p>
      <Button onClick={closeAllModals}>Close All Modals</Button>
    </Modal>
  )
}

export default () => {
  const open = useOpenModal()

  useRegisterModal({
    'out-modal': {
      component: OutModal
    },
    'child-modal': {
      component: ChildModal
    }
  })

  return (
    <div>
      <Button
        onClick={() => open({
          modalId: 'out-modal'
        })}
      >
        Open Out Modal
      </Button>
      
    </div>
  );
};
