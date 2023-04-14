import React, { FC, useEffect, useMemo, createElement, ReactElement } from 'react'

import { useModalContext } from './context'
import { ModalItem } from './types'
import { ModalActionType } from './constants'

export const WrappedModalComponent: FC<any> = ({
  render,
  modalProps,
  opened,
  renderIfClosed
}): ReactElement | null => {
  if ((!opened && !renderIfClosed) || !render) {
    return null
  }

  return <>{render(modalProps)}</>
}


export const Mounter: FC = () => {
  const { state, dispatch } = useModalContext()
  const mountableCompnent = useMemo(() => {
    const entries: IterableIterator<ModalItem> = state.values()
    const components: ReactElement[] = []

    for (const entry of entries) {
      if (entry.component) {
        components.push(createElement(WrappedModalComponent, {
          render: entry.component,
          modalProps: {},
          renderIfClosed: false,
          opened: false,
          key: entry.id
        }))
      }
    }

    return components
  }, [state])

  useEffect(() => {
    const entries = state.values()

    for (const entry of entries) {
      if (entry.isLazy && !entry.loaded) {
        dispatch(ModalActionType.LoadLazyModal, {
          id: entry.id
        })

        try {
          const loader = entry.loader
          loader?.().then((instance) => {
            console.log(instance)

            dispatch(ModalActionType.LazyModalLoaded, {
              id: entry.id,
              
            })
          })

        } catch (err) {

        }
      }
    }
  }, [state])

  return (
    <>
      {mountableCompnent}
    </>
  )
}

