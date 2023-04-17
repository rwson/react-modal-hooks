import React, { createElement, useEffect, useMemo, useState } from 'react'
import { Modal, Button } from 'antd'

import Lazy1 from './lazy-modals/modal-1'

import { useOpenModal, useUpdateModal } from '../react-modal-better-hooks/react-modal-better-hooks.esm.js'

export default () => {
  const [ state, setState ] = useState({
    visible: true,
    content: 'test111'
  })

  const openModal = useOpenModal()
  const updateModal = useUpdateModal()

  return (
    <div>
      <Button onClick={() => {
        openModal({
          modalId: 'modal1',
          props: {
            title: 'Modal1',
            content: 'I\' init props'
          },
        })

        setTimeout(() => {
          updateModal({
            modalId: 'modal1',
            merge: true,
            props: {
              content: 'I\'m updated props'
            }
          }, true)
        }, 5000)
      }} >
        Open Normal Modal
      </Button>
      <Button onClick={() => {}}>
        Open UpdateAble Modal
      </Button>
    </div>
  );
};
