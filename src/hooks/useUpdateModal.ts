import React, { useCallback } from 'react'

import { ModalActionType } from '../constants'
import { useModalContext } from '../context'
import { ModalItem } from '../types'

interface UpdateModalInput<T> {
  readonly modalId: string
  readonly props?: T
  readonly merge?: boolean
}

type UseUpdateModalReturn<T> = (params: UpdateModalInput<T>) => void

export const useUpdateModal = <T>(): UseUpdateModalReturn<T> => {
  const { state, dispatch } = useModalContext()

  const update = useCallback(({ modalId, merge, props }: UpdateModalInput<T>): void => {
    const modalItem = state.get(modalId)

    dispatch(ModalActionType.UpdateModal, {
      id: modalId,
      props: (props as T)!,
      __mergeProps___: merge
    })
  }, [state])

  return update
}