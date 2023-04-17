import React, {
  createContext,
  useReducer,
  useCallback,
  useContext,
  FC,
  PropsWithChildren,
} from 'react'

import {
  reducer,
  initialState
} from './reducer'
import {
  ModalStateMap,
  Actions,
  ActionsMap,
  Dispatcher
} from './types'

import { ModalAutoMounter } from './components/ModalAutoMounter'

const ModalContext = createContext<{
  state: ModalStateMap
  dispatch: Dispatcher
  defaultProps: Record<string, any>
}>({
  state: initialState,
  dispatch: () => undefined,
  defaultProps: {},
})

ModalContext.displayName = 'RMBH_Context'

export const ModalProvider: FC<PropsWithChildren<any>> = ({ children, defaultProps = {} }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //  @ts-ignore
  const dispatchAction: Dispatcher = useCallback((type, payload) => {
    dispatch({ type, payload })
  }, [])

  const value = {
    state,
    defaultProps,
    dispatch: dispatchAction,
  }

  return (
    <ModalContext.Provider value={value}>
      <>
        <ModalAutoMounter />
        {children}
      </>
    </ModalContext.Provider>
  )
}

export const useModalContext = (): {
  state: ModalStateMap
  dispatch: Dispatcher
  defaultProps: Record<string, any>
} => useContext(ModalContext)
