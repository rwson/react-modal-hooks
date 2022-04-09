import React, { useMemo, useEffect, ReactElement, cloneElement } from 'react'

import merge from 'lodash/merge'

import { useModalContext } from './context'
import { ModalActionType } from './constants'
import { ModalItem } from './reducer'

type UseModalParams<T> = {
  id: string
  keepAlive?: boolean
  render?: (props: ModalRenderProps<T>) => any
}

export declare type ModalBasicProps<T> = {
  visible: boolean,
  [key: string]: any
}

const WrappedModalComponent = ({ render, modalProps, opened }) => {
  if (!opened) {
    return null
  }

  return (
    <>
      {render(modalProps)}
    </>
  )
}

export function useModal<T = any>(params : UseModalParams<T> | string): [ ReactElement, {
  opened: boolean,
  open: (props?: T) => void,
  close: () => void,
  closeAll: () => void
} ] {
  const { dispatch, state, defaultProps } = useModalContext()

  let opened: boolean = false
  let props: any = {}

  let id, render, keepAlive

  if (typeof params === 'string') {
    id = params
  } else {
    id = params.id
    keepAlive = params.keepAlive
    render = params.render
  }

  if (typeof keepAlive === 'undefined') {
    keepAlive = true
  }

  let modal = state.modals.find((modal) => modal.id === id)

  useEffect(() => {
    modal = state.modals.find((modal) => modal.id === id)
  }, [state.modals])

  if (modal) {
    props = (modal as any).props ?? {}
    props.visible = modal.opened
    opened = modal.opened

    if (modal.isLazy) {
      render = modal.component
    }
  }

  useEffect(() => {
    return () => {
      if (!keepAlive) {
        dispatch?.(ModalActionType.RemoveModal, {
          id
        })
      }
    }
  }, [keepAlive, id, dispatch])

  const open = (props) => dispatch?.(ModalActionType.OpenModal, {
    id,
    props: merge(props, defaultProps)
  })

  const close = () => dispatch?.(ModalActionType.CloseModal, { id })

  const closeAll = () => dispatch?.(ModalActionType.CloseAllModals)

  return [
    <WrappedModalComponent render={render} modalProps={props} opened={opened} />,
    {
      opened,
      open,
      close,
      closeAll
    }
  ]
}

type ModalRenderProps<T> = {
  [P in keyof T]?: T[P]
} & ModalItem
