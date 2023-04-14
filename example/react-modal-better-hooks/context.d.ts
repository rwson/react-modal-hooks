import { FC, PropsWithChildren } from 'react';
import { ModalStateMap, Dispatcher, ModalProviderProps } from './types';
export declare const ModalProvider: FC<PropsWithChildren<{
    defaultProps: ModalProviderProps;
}>>;
export declare const useModalContext: () => {
    state: ModalStateMap;
    dispatch: Dispatcher;
    defaultProps: ModalProviderProps;
};
