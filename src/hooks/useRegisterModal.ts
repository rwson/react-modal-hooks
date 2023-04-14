import React, { ComponentType, useEffect } from 'react'

import { useModalContext } from '../context'
import { Importer } from '../types'
import { ModalActionType } from '../constants'

interface ModalRegisterItem {
  readonly isLazy?: boolean
  readonly component?: ComponentType
  readonly loader?: Importer
}

type RegisterModalInput = Record<string, ModalRegisterItem>

export const useRegisterModal = () => {
  const register = (modals: RegisterModalInput) => {
    const { dispatch, state } = useModalContext()

    useEffect(() => {
      Object.keys(modals).forEach((modalId: string) => {
        const registerItem = modals[modalId]

        const modalItem: Record<string, any> = {
          id: modalId,
          isLazy: registerItem.isLazy,
          component: registerItem.component,
          loader: registerItem.loader
        }

        if (modalItem.isLazy) {
          modalItem.loaded = false
          modalItem.loading = false
          modalItem.loadFailed = false
        }

        dispatch(ModalActionType.RegisterModal, modalItem)
      })
    }, [modals, state])
  }

  return register
}
