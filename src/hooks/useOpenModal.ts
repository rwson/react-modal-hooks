import React, { useState } from 'react'

import { ModalActionType } from '../constants'
import { useModalContext } from '../context'
import { ModalItem } from '../types'
import { WrappedModalComponent } from '../wrapped'

interface OpenModalInput<T> {
  readonly modalId: string
  readonly props?: T
}

type UseOpenModalReturn<T> = (params: OpenModalInput<T>) => void | undefined

export const useOpenModal = <T>(): UseOpenModalReturn<T> => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const { state, dispatch, defaultProps } = useModalContext()

  const open = ({ modalId, props }: OpenModalInput<T>): void | undefined => {
    const modalItem = state.get(modalId)

    if (modalItem?.isLazy && !modalItem?.loaded && !modalItem.loading) {
      const loader = modalItem.loader
      dispatch(ModalActionType.LoadLazyModal, {
        id: modalId
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
            id: modalId,
            props
          })
        }, 30)
      })
      return
    }

    dispatch(ModalActionType.OpenModal, {
      id: modalId,
      props
    })
  }

  return open
}