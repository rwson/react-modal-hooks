import { FC, PropsWithChildren } from 'react';
import { ModalStateMap, Dispatcher } from './types';
export declare const ModalProvider: FC<PropsWithChildren<any>>;
export declare const useModalContext: () => {
    state: ModalStateMap;
    dispatch: Dispatcher;
    defaultProps: Record<string, any>;
};
