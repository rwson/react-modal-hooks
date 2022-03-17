import React, { createContext, useReducer, useCallback, useContext } from 'react'

import { reducer, initialState, ModalState, Actions, ActionsMap } from './reducer'

export type Dispatcher = <
  Type extends Actions['type'],
  Payload extends ActionsMap[Type]
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

const ModalContext = createContext<{
  state: ModalState
  dispatch: Dispatcher
  defaultProps: any
}>({
  state: initialState,
  dispatch: () => undefined,
  defaultProps: {}
})

ModalContext.displayName = 'RHModalBetterContext'

export const ModalProvider = ({ children, defaultProps = {} }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  const dispatchAction: any = useCallback((type, payload) => {
    dispatch({ type, payload } as any)
  }, [])

  const value = {
    state,
    defaultProps,
    dispatch: dispatchAction
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = (): {
  state: ModalState,
  dispatch: Dispatcher
  defaultProps: any
} => useContext(ModalContext)
