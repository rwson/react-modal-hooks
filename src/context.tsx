import {
  reducer,
  initialState,
  ModalState,
  Actions,
  ActionsMap,
} from './reducer';
import React, {
  createContext,
  useReducer,
  useCallback,
  useContext,
} from 'react';

export type Dispatcher = <
  Type extends Actions['type'],
  Payload extends ActionsMap[Type]
>(
  type: Type | any,
  ...payload: Payload extends undefined ? [undefined?] : [Payload] | any
) => void;

const ModalContext = createContext<{
  state: ModalState;
  dispatch: Dispatcher;
  defaultProps: any;
}>({
  state: initialState,
  dispatch: () => undefined,
  defaultProps: {},
});

ModalContext.displayName = 'RHMBContext';

export const ModalProvider = ({ children, defaultProps = {} }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //  @ts-ignore
  const dispatchAction: Dispatcher = useCallback((type, payload) => {
    dispatch({ type, payload });
  }, []);

  const value = {
    state,
    defaultProps,
    dispatch: dispatchAction,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = (): {
  state: ModalState;
  dispatch: Dispatcher;
  defaultProps: any;
} => useContext(ModalContext);
