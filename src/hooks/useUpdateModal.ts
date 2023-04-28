import React, { useCallback } from 'react'

import { ModalActionType } from '../constants'
import { useModalContext } from '../context'
import { ModalItem } from '../types'

interface UpdateModalInput<T> {
  readonly merge?: boolean
  readonly props: T
}

type UseUpdateModalReturn<T> = (id: string, params: UpdateModalInput<T>) => void

export const useUpdateModal = <T>(): UseUpdateModalReturn<T> => {
  const { state, dispatch } = useModalContext()

  const update = useCallback((id, { merge, props }: UpdateModalInput<T>): void => {
    dispatch(ModalActionType.UpdateModal, {
      id,
      props: (props as T)!,
      __mergeProps___: merge
    })
  }, [state])

  return update
}