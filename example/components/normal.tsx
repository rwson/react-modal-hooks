import React from 'react'
import { Modal, Button } from 'antd'

import { useModal } from '../..'

export default () => {
  const [NomalModal, { open, close }] = useModal<{ content: string }>('normal-modal', (props) => {
    return (
      <Modal {...props} onCancel={close}>
        {props.content}
      </Modal>
    )
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
      <NomalModal />
    </div>
  );
};
