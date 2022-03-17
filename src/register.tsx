import React, { ComponentType, useEffect, useCallback, PropsWithChildren } from 'react'
import { useModalContext } from './context'
import { ModalActionType } from './constants'

const moduleLoader = (importer: Importer) => async() => {
  const module = await importer()
  return module
}

export function withModals<T = any>(Component: ComponentType<PropsWithChildren<T>>) {
  return (modals: RegisterModalsParams) => (props: T) => {
    const { dispatch, state } = useModalContext()

    const loadModal = useCallback(async(id: string) => {
      const modal = state.modals.find((modal) => modal.id === id)
      if (modal) {
        try {
          //  When unload modal and module load failed, load module
          if (!modal.loaded || modal.loadFailed) {
            const module = await modal.loader?.()
            dispatch?.(ModalActionType.LazyModalLoaded, {
              loaded: true,
              loadFailed: false,
              component: module?.default,
              id,
            })
          }
        } catch (e) {
          dispatch?.(ModalActionType.LazyModalLoaded, {
            loaded: false,
            loadFailed: true,
            id
          })
        }
      }
    }, [state])
  
    const loadModals = useCallback(() => {
      const keys: string[] = Object.keys(modals)
  
      for (const key of keys) {
        dispatch?.(ModalActionType.AddLazyModal, {
          id: key,
          loader: moduleLoader(modals[key])
        })
      }
    }, [modals])
  
    useEffect(() => {
      loadModals()
    }, [modals])

    useEffect(() => {
      const keys: string[] = Object.keys(modals)
      for (const key of keys) {
        loadModal(key)
      }
    }, [state.modals.length])

    return <Component {...props} />
  }
}

export type Importer<T = any> = () => Promise<{ default: ComponentType<PropsWithChildren<T>> }>;

export type RegisterModalsParams = {
  [key: string]: Importer
}
