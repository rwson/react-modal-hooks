import React from 'react'
import { Modal, Button } from 'antd'

import { useModal } from '../react-modal-better-hooks/react-modal-better-hooks.esm.js'

export default () => {
  const [NomalModal, { open, close }] = useModal<{ content: string }>({
    id: 'normal-modal',
    renderIfClosed: true,
    keepAlive: true,
    displayName: 'NormalModal',
    render: (props) => {
      return (
        <Modal {...props} onCancel={close}>
          {props.content}
        </Modal>
      )
    }
  })

  return (
    <div>
      <Button
        onClick={() =>
          open({
            content: "I'm a Modal Called By react-modal-better-hooks"
          })
        }
      >
        Open Normal Modal
      </Button>
      {NomalModal}
    </div>
  );
};
