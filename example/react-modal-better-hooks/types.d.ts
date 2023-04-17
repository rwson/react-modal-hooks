import { ComponentType, PropsWithChildren } from 'react';
import { ModalActionType } from './constants';
export declare type Importer<T = any> = () => Promise<{
    default: ComponentType<PropsWithChildren<T>>;
}>;
export interface CloseModalParams {
    id: string;
}
export interface OpenModalParams {
    id: string;
    props?: {
        [key: string]: any;
    };
}
export interface UpdateModalParams {
    id: string;
    merge?: boolean;
    props?: {
        [key: string]: any;
    };
}
export interface AddLazyModalParams {
    id: string;
    isLazy?: boolean;
    loaded?: boolean;
    loadFailed?: boolean;
    loader?: Importer;
    component?: ComponentType | any;
    props?: {
        [key: string]: any;
    };
}
export declare type ActionsMap = {
    [ModalActionType.OpenModal]: OpenModalParams;
    [ModalActionType.RegisterModal]: AddLazyModalParams;
    [ModalActionType.LoadLazyModal]: CloseModalParams;
    [ModalActionType.LazyModalLoaded]: AddLazyModalParams;
    [ModalActionType.CloseModal]: CloseModalParams;
    [ModalActionType.RemoveModal]: CloseModalParams;
    [ModalActionType.UpdateModal]: UpdateModalParams;
    [ModalActionType.CloseAllModals]: any;
};
export declare type Actions = {
    [Key in keyof ActionsMap]: {
        type: Key;
        payload: ActionsMap[Key];
    };
}[keyof ActionsMap];
export declare type ModalItem = {
    id: string;
    visible: boolean;
    isLazy?: boolean;
    loaded?: boolean;
    loading?: boolean;
    loadFailed?: boolean;
    loader?: Importer;
    component?: ComponentType;
    props?: Record<string, any>;
};
export declare type ModalStateMap = Map<string, ModalItem>;
export declare type ModalRenderProps<T> = {
    [K in keyof T]?: T[K];
} & ModalItem;
export declare type Dispatcher = <Type extends Actions['type'], Payload extends ActionsMap[Type]>(type: Type | any, ...payload: Payload extends undefined ? [undefined?] : [Payload] | any) => void;
export declare type ModalBasicProps<T> = {
    [K in keyof T]: T[K];
} & {
    visible: boolean;
};
