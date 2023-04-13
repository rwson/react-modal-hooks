import React from 'react'
import { Modal, Button } from 'antd'

import { useModal, useCloseModal } from '../react-modal-better-hooks/react-modal-better-hooks.esm.js'

export default () => {
  const {
    close,
    closeAll
  } = useCloseModal()

  const [ChildModal, { open: openNested }] = useModal({
    id: 'child-modal',
    render: (props) => {
      return (
        <Modal {...props} onCancel={() => close('child-modal')} width="400px">
          <p>I'm Nested Modal</p>
          <Button onClick={closeAll}>Close All Modals</Button>
        </Modal>
      )
    }
  })

  const [OutModal, { open }] = useModal({
    id: 'out-modal',
    ignoreEvent: false,
    render: (props) => {
      console.log(props)

      return (
        <Modal {...props} onCancel={() => close('out-modal')}>
          <p>I'm Out Modal</p>
          <Button
            onClick={() =>
              openNested()
            }
          >
            Open Nested Modal
          </Button>
        </Modal>
      )
    }
  })

  return (
    <div>
      <Button
        onClick={open}
      >
        Open Out Modal
      </Button>
      {OutModal}
      {ChildModal}
    </div>
  );
};
