import React, { createElement, useEffect, useMemo, useState } from 'react'
import { Modal, Button } from 'antd'

import Lazy1 from './lazy-modals/modal-1'

import { useModal } from '../react-modal-better-hooks/react-modal-better-hooks.esm.js'

export default () => {
  const [ state, setState ] = useState({
    visible: true,
    content: 'test111'
  })

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

  const [UpdateAbleModal, { open: openUpdate, close: closeUpdate, update }] = useModal<{ content: string }>({
    id: 'updateable-modal',
    renderIfClosed: true,
    keepAlive: true,
    displayName: 'UpdateAbleModal',
    render: (props) => {
      return (
        <Modal {...props} onCancel={closeUpdate}>
          {props.content}
        </Modal>
      )
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setState({
        visible: true,
        content: 'askjdhaksjndkajnsd'
      })
    }, 5000)
  }, [])

  const renderModal = useMemo(() => createElement(Lazy1, state), [state])

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
      <Button onClick={() => {
        openUpdate({
          content: 'updateable modal init props, and it will updated after 5s'
        })

        setTimeout(() => {
          update({
            merge: true,
            props: {
              content: 'new modal props'
            }
          })
        }, 5000)
      }}>
        Open UpdateAble Modal
      </Button>
      {NomalModal}
      {UpdateAbleModal}
    </div>
  );
};
