import { ComponentType } from 'react'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'

import { ModalActionType } from './constants'

import { Importer } from './register'

export const initialState: ModalState = {
  modals: []
}

export const reducer = (state: ModalState, action: Actions): ModalState => {
  const { id: payloadId, props: payloadProps } = action.payload
  let modals, lastIndex

  switch(action.type) {
    case ModalActionType.OpenModal:
      modals = cloneDeep<ModalItem[]>(state.modals)
      lastIndex = modals.findIndex(({ id }) => id === payloadId)
      if (lastIndex === -1) {
        modals.push({
          ...action.payload,
          opened: true
        } as ModalItem)
      } else {
        modals = modals.map((modal) => {
          if (modal.id === payloadId) {
            if (!isEqual(modal.props, action.payload.props)) {
              modal.props = action.payload.props
            }
            modal.opened = true
          }
          return modal
        })
      }

    return {
      ...state,
      modals
    }

    //  FIXME: Need to avoid open/close nested Modal outModal will rerender
    case ModalActionType.CloseModal:
    return {
      ...state,
      modals: state.modals.map((modal) => modal.id === payloadId ? ({
        ...modal,
        opened: false
      }) : modal)
    }

    case ModalActionType.CloseAllModals:
      return {
        ...state,
        modals: state.modals.map((modal) => ({
          ...modal,
          opened: false
        }))
      }

    case ModalActionType.AddLazyModal:
      modals = cloneDeep<ModalItem[]>(state.modals)
      lastIndex = modals.findIndex(({ id }) => id === payloadId)

      if (lastIndex === -1) {
        modals.push({
          id: payloadId,
          loaded: false,
          isLazy: true,
          loadFailed: false,
          loader: action.payload.loader
        } as ModalItem)
      }

      return {
        ...state,
        modals
      }

    case ModalActionType.LazyModalLoaded:
      modals = cloneDeep<ModalItem[]>(state.modals)

      return {
        ...state,
        modals: modals.map((modal) => modal.id === payloadId ? ({
          ...modal,
          loaded: true,
          loadFailed: false,
          component: action.payload.component
        }) : modal)
      }
  }
}

export interface CloseModalParams {
  id: string
}

export interface OpenModalParams {
  id: string
  props?: {
    [key: string]: any
  }
}

export interface AddLazyModalParams {
  id: string
  isLazy?: boolean
  loaded?: boolean
  loadFailed?: boolean
  loader?: Importer
  component?: ComponentType | any
  props?: {
    [key: string]: any
  }
}

export interface CloseAllModalParams {}

export type ActionsMap = {
  [ModalActionType.OpenModal]: OpenModalParams
  [ModalActionType.AddLazyModal]: AddLazyModalParams
  [ModalActionType.LazyModalLoaded]: AddLazyModalParams
  [ModalActionType.CloseAllModals]: any
  [ModalActionType.CloseModal]: CloseModalParams
}

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  }
}[keyof ActionsMap]

export type ModalItem = {
  id: string
  type: string
  opened: boolean
  isLazy?: boolean
  loaded?: boolean
  loadFailed?: boolean
  visible?: boolean
  loader?: Importer
  component?: ComponentType | any
  props?: {
    [key: string]: any
  }
}

export type ModalState = {
  modals: ModalItem[]
}