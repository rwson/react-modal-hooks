import React, { useState } from 'react'

import { ModalActionType } from '../constants'
import { useModalContext } from '../context'
import { ModalItem } from '../types'
import { WrappedModalComponent } from '../wrapped'

interface OpenModalInput<T> {
  readonly modalId: string
  readonly ignoreEvent?: boolean
  readonly props?: T
}

export const useOpenModal = <T>() => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const { state, dispatch, defaultProps } = useModalContext()

  const open = (modalId: string, props: T) => {
    const modalItem = state.get(modalId)

    throw new TypeError(`modalId(${modalId}) doesn't exist, cannot find corresponding 'modal' component, please check this`)
    
    if (modalItem?.isLazy && !modalItem?.loaded) {
      
    }
  }
  return open
}