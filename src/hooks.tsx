import React, { useMemo, useEffect } from 'react'

import merge from 'lodash/merge'

import { useModalContext } from './context'
import { ModalActionType } from './constants'
import { ModalItem } from './reducer'

const WrapperConponent = ({ render, modalProps }) => {
  return (
    <>
      {render(modalProps)}
    </>
  )
}

export function useModal<T = any>(id: string, render?: (props: ModalRenderProps<T>) => JSX.Element) {
  const { dispatch, state, defaultProps } = useModalContext()

  let opened: boolean = false
  let props: any = {}

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

  const open = (props) => dispatch?.(ModalActionType.OpenModal, {
    id,
    props: merge(props, defaultProps)
  })

  const close = () => dispatch?.(ModalActionType.CloseModal, { id })

  const closeAll = () => dispatch?.(ModalActionType.CloseAllModals)

  return [
    () => opened ? <WrapperConponent render={render} modalProps={props} /> : null,
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
