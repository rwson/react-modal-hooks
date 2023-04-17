import React from 'react'
import { Modal } from 'antd'

import { useCloseModal } from '../../react-modal-better-hooks/react-modal-better-hooks.esm.js'

export default (props) => {
  const { closeModal } = useCloseModal()

  return (
    <Modal {...props} onCancel={() => {
      console.log(11111)
      closeModal('modal1')
    }}>
      Lazy Load Modal1
      {props.content}
    </Modal>
  )
}