import React, { useState } from 'react'

import { ModalActionType } from '../constants'
import { useModalContext } from '../context'
import { ModalItem } from '../types'
import { WrappedModalComponent } from '../wrapped'

type UseOpenModalReturn<T> = (id: string, props?: T) => void | undefined

export const useOpenModal = <T extends any>(): UseOpenModalReturn<T> => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const { state, dispatch, defaultProps } = useModalContext()

  const open = (id: string, props?: T): void | undefined => {
    const modalItem = state.get(id)
    const modalProps = props ?? {}

    if (modalItem?.isLazy && !modalItem?.loaded && !modalItem.loading) {
      const loader = modalItem.loader
      dispatch(ModalActionType.LoadLazyModal, {
        id
      })

      loader?.().then((instance) => {
        dispatch(ModalActionType.LazyModalLoaded, {
          id: modalItem.id,
          component: instance.default,
          loadFailed: false,
          loaded: true
        })

        setTimeout(() => {
          dispatch(ModalActionType.OpenModal, {
            id,
            props: modalProps
          })
        }, 30)
      })
      return
    }

    dispatch(ModalActionType.OpenModal, {
      id,
      props: modalProps
    })
  }

  return open
}