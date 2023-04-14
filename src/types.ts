import { ComponentType, PropsWithChildren, ReactElement } from 'react'

import { ModalActionType } from './constants'

export type Importer<T = any> = () => Promise<{
  default: ComponentType<PropsWithChildren<T>>
}>

export type RegisterModalsParams<T = any> = {
  [key: string]: Importer
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

export type ActionsMap = {
  [ModalActionType.OpenModal]: OpenModalParams
  [ModalActionType.RegisterModal]: AddLazyModalParams
  [ModalActionType.LoadLazyModal]: CloseModalParams
  [ModalActionType.LazyModalLoaded]: AddLazyModalParams
  [ModalActionType.CloseModal]: CloseModalParams
  [ModalActionType.RemoveModal]: CloseModalParams
  [ModalActionType.UpdateModal]: any
  [ModalActionType.CloseAllModals]: void
}

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key
    payload: ActionsMap[Key]
  }
}[keyof ActionsMap]

export type ModalItem = {
  id: string
  visible: boolean
  isLazy?: boolean
  loaded?: boolean
  loading?: boolean
  loadFailed?: boolean
  visible?: boolean
  loader?: Importer
  component?: ComponentType
  props?: {
    [key: string]: any
  }
}

export type ModalStateMap = Map<string, ModalItem>

export type ModalRenderProps<T> = {
  [K in keyof T]?: T[K]
} & ModalItem

export type Dispatcher = <
  Type extends Actions['type'],
  Payload extends ActionsMap[Type]
>(
  type: Type | any,
  ...payload: Payload extends undefined ? [undefined?] : [Payload] | any
) => void

export type UseModalParams<T> = {
  id: string
  ignoreEvent?: boolean
  keepAlive?: boolean
  renderIfClosed?: boolean
  render?: (props: ModalBasicProps<T>) => any
}

export type UpdateModalParams<T> = {
  merge?: boolean
  props: Partial<T>
}

export type ModalBasicProps<T> = {
  [K in keyof T]: T[K]
} & {
  visible: boolean
}

export type ModalProviderProps = {
  mountNode?: string
}
