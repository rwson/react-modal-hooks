import React from 'react'
import { Modal, Button } from 'antd'

import { withModals, useModal } from '../../src'

const Dynmaic = () => {
  const [ LazyModal1, { open: openLazyModal1 } ] = useModal('modal-1')
  const [ LazyModal2, { open: openLazyModal2 } ] = useModal('modal-2')

  return (
    <div>
      LazyModal
      <Button onClick={() => openLazyModal1({
        content: "I'm lazy modal one called by react-modal-better-hooks"
      })}>
        Open Lazy Modal1
      </Button>
      <Button onClick={() => openLazyModal1({
        content: "I'm lazy modal two called by react-modal-better-hooks"
      })}>
        Open Lazy Modal2
      </Button>
      <LazyModal1 />
      <LazyModal2 />
    </div>
  );
};

export default withModals(Dynmaic)({
  'modal-1': () => import('./lazy-modals/modal-1'),
  'modal-2': () => import('./lazy-modals/modal-2')
})
