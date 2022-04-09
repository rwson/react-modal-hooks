import React from 'react'
import { Modal, Button } from 'antd'

import { useModal } from '../..'

export default () => {
  const [ChildModal, { open: openNested, close: closeNested, closeAll }] = useModal('child-modal', (props) => {
    return (
      <Modal {...props} onCancel={closeNested} width="400px">
        <p>I'm Nested Modal</p>
        <Button onClick={closeAll}>Close All Modals</Button>
      </Modal>
    )
  })

  const [OutModal, { open, close }] = useModal('out-modal', (props) => {
    return (
      <Modal {...props} onCancel={close}>
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
  })

  return (
    <div>
      <Button
        onClick={() =>
          open()
        }
      >
        Open Out Modal
      </Button>
      <OutModal />
      <ChildModal />
    </div>
  );
};
