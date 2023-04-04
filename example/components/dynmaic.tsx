import React from 'react'
import { Modal, Button } from 'antd'

import Loading from './loading'

import { withModals, useModal } from '../react-modal-better-hooks/react-modal-better-hooks.esm.js'

const Dynmaic = () => {
  const [ LazyModal1, { open: openLazyModal1, update, close: closeLazyModal1 } ] = useModal('modal-1')
  const [ LazyModal2, { open: openLazyModal2, close: closeLazyModal2, loading } ] = useModal('modal-2')

  return (
    <div>
      LazyModal
      <Button onClick={() => {
        openLazyModal1({
          content: "I'm lazy modal one called by react-modal-better-hooks, and it will be updated after 5s",
          onCancel: closeLazyModal1
        })

        setTimeout(() => {
          update({
            merge: true,
            props: {
              content: "I'm new props from update hooks"
            }
          })
        }, 5000)
      }}>
        Open Lazy Modal1
      </Button>
      <Button onClick={() => openLazyModal2({
        content: "I'm lazy modal two called by react-modal-better-hooks",
        onCancel: closeLazyModal2
      })}>
        Open Lazy Modal2
      </Button>
      {
        loading && <Loading />
      }
      {LazyModal1}
      {LazyModal2}
    </div>
  );
};

export default withModals(Dynmaic)({
  'modal-1': {
    loader: () => import('./lazy-modals/modal-1')
  },
  'modal-2': {
    loader: () => import('./lazy-modals/modal-2'),
    shouldComponentLoad: (props) => props.shouldLoadModal2
  }
})
