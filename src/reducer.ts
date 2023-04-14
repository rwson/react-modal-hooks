import { ComponentType } from 'react'
import produce from 'immer'

import { ModalActionType } from './constants'
import { Importer, CloseModalParams, OpenModalParams, AddLazyModalParams, ActionsMap, Actions, ModalItem, ModalStateMap } from './types'

export const initialState = new Map()

export const reducer = produce(
  (state: ModalStateMap, action: Actions): ModalStateMap => {
    const { id: payloadId, props: payloadProps, loader, component, loadFailed, shouldComponentLoad, loaded } = action.payload ?? {}
    const allKeys: Array<string> = Array.from(state.keys())
    const registed: boolean = state.has(payloadId)

    let currentModal: ModalItem | undefined = state.get(payloadId)

    switch (action.type) {
      // case ModalActionType.OpenModal:
      //   if (registed) {
      //     if (currentModal) {
      //       currentModal.opened = true
      //       currentModal.props = payloadProps
      //     }
      //   } else {
      //     currentModal = Object.assign({}, action.payload, {
      //       opened: true,
      //     })
      //   }

      //   state.set(payloadId, currentModal as ModalItem)
      //   return state

      // case ModalActionType.UpdateModal:
      //   if (currentModal) {
      //     currentModal.opened = true
      //     currentModal.props = payloadProps
      //     state.set(payloadId, currentModal as ModalItem)
      //   }
      // return state


      // case ModalActionType.CloseModal:
      //   if (currentModal) {
      //     currentModal.opened = false
      //     state.set(payloadId, currentModal)
      //   }
      //   return state

      // case ModalActionType.CloseAllModals:
      //   allKeys.forEach((key: string) => {
      //     currentModal = state.get(key) as ModalItem
      //     currentModal.opened = false
      //     state.set(key, currentModal)
      //   })
      //   return state

      case ModalActionType.RegisterModal:
        if (!registed) {
          state.set(payloadId, {
            ...action.payload,
            id: payloadId,
            props: {}
          } as ModalItem)
        }
        return state

      case ModalActionType.LoadLazyModal:
        if (currentModal) {
          currentModal.loading = true
          currentModal.loadFailed = false
        }
        return state

      // case ModalActionType.LazyModalLoaded:
      //   if (currentModal) {
      //     currentModal.loaded = loaded
      //     currentModal.loadFailed = loadFailed
      //     currentModal.loading = false
      //     currentModal.component = component
      //     state.set(payloadId, currentModal as ModalItem)
      //   }
      //   return state

      default:
        return state
    }
  }
)
