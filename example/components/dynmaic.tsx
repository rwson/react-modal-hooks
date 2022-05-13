import React from 'react'
import { Modal, Button } from 'antd'

import { withModals, useModal } from 'react-modal-better-hooks'

const Dynmaic = () => {
  const [ LazyModal1, { open: openLazyModal1, close: closeLazyModal1 } ] = useModal('modal-1')
  const [ LazyModal2, { open: openLazyModal2, close: closeLazyModal2 } ] = useModal('modal-2')

  return (
    <div>
      LazyModal
      <Button onClick={() => openLazyModal1({
        content: "I'm lazy modal one called by react-modal-better-hooks",
        onCancel: closeLazyModal1
      })}>
        Open Lazy Modal1
      </Button>
      <Button onClick={() => openLazyModal2({
        content: "I'm lazy modal two called by react-modal-better-hooks",
        onCancel: closeLazyModal2
      })}>
        Open Lazy Modal2
      </Button>
      {LazyModal1}
      {LazyModal2}
    </div>
  );
};

export default withModals(Dynmaic)({
  'modal-1': () => import('./lazy-modals/modal-1'),
  'modal-2': () => import('./lazy-modals/modal-2')
})
