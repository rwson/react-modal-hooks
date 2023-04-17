import React, { ComponentType, useEffect, useMemo } from 'react'

import { useModalContext } from '../context'
import { Importer } from '../types'
import { ModalActionType } from '../constants'

interface ModalRegisterItem {
  readonly isLazy?: boolean
  readonly component?: ComponentType
  readonly loader?: Importer
}

type RegisterModalInput = Record<string, ModalRegisterItem>

type UseRegisterModalReturn = (modals: RegisterModalInput) => void

export const useRegisterModal = (): UseRegisterModalReturn => {
  const register = (modals: RegisterModalInput): void => {
    const { dispatch, state } = useModalContext()

    const diffModals = useMemo(() => {
      return Object.keys(modals).reduce((result: RegisterModalInput, modalId: string) => {
        if (state.get(modalId)) {
          return result
        }
        
        return {
          ...result,
          [modalId]: modals[modalId]
        }
      }, {})
    }, [modals, state])

    useEffect(() => {
      Object.keys(diffModals).forEach((modalId: string) => {
        const registerItem = diffModals[modalId]

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
    }, [diffModals])
  }

  return register
}
