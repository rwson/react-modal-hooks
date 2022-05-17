/// <reference types="react" />
import { ModalStateMap, Actions, ActionsMap } from './reducer';
export declare type Dispatcher = <Type extends Actions['type'], Payload extends ActionsMap[Type]>(type: Type | any, ...payload: Payload extends undefined ? [undefined?] : [Payload] | any) => void;
export declare const ModalProvider: ({ children, defaultProps }: {
    children: any;
    defaultProps?: {} | undefined;
}) => JSX.Element;
export declare const useModalContext: () => {
    state: ModalStateMap;
    dispatch: Dispatcher;
    defaultProps: any;
};
