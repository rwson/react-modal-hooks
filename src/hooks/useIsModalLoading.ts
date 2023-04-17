import { useMemo, useState } from 'react'

import { useModalContext } from '../context'

export const useIsModalLoading = (modalId: string): boolean => {
  const { state } = useModalContext()

  return useMemo<boolean>(() => {
    const modal = state.get(modalId)

    if (!modal) {
      return false
    }

    return modal.loading!
  }, [state, modalId])
}