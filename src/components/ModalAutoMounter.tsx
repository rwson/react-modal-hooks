import React, { FC, useEffect, useMemo, createElement, ReactElement } from 'react'

import { useModalContext } from '../context'
import { ModalItem } from '../types'
import { ModalActionType } from '../constants'
import { WrappedModal } from './WrappedModal'

export const ModalAutoMounter: FC = () => {
  const { state, dispatch } = useModalContext()
  const mountableCompnent = useMemo(() => {
    const entries: IterableIterator<ModalItem> = state.values()
    const components: ReactElement[] = []

    for (const entry of entries) {
      if (entry.component) {
        components.push(createElement(WrappedModal, {
          render: entry.component,
          renderProps: entry.props,
          visible: entry.visible,
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
            dispatch(ModalActionType.LazyModalLoaded, {
              id: entry.id,
              component: instance.default,
              loadFailed: false,
              loaded: true
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

