/// <reference types="react" />
import { ModalStateMap, Dispatcher } from './types';
export declare const ModalProvider: ({ children, defaultProps }: {
    children: any;
    defaultProps?: {} | undefined;
}) => JSX.Element;
export declare const useModalContext: () => {
    state: ModalStateMap;
    dispatch: Dispatcher;
    defaultProps: any;
};
