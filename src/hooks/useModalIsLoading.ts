import { useMemo, useState } from 'react'

import { useModalContext } from '../context'

export const useModalIsLoading = (modalIds: string | string[]): boolean => {
  const { state } = useModalContext()
  return useMemo<boolean>(() => {
    const ids: string[] = Array.isArray(modalIds) ? modalIds : [modalIds]
    const modals = ids.map((id: string) => state.get(id)).filter(Boolean)

    if (!modals.length) {
      return false
    }

    return modals.some((modal) => modal?.isLazy ? modal.loading : false)
  }, [state, modalIds])
}