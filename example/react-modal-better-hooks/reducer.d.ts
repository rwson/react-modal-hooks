import { ModalActionType } from './constants';
import { Importer } from './register';
import { ComponentType } from 'react';
export declare const initialState: Map<any, any>;
export declare const reducer: (base: ReadonlyMap<string, {
    readonly id: string;
    readonly opened: boolean;
    readonly isLazy?: boolean | undefined;
    readonly loaded?: boolean | undefined;
    readonly loadFailed?: boolean | undefined;
    readonly visible?: boolean | undefined;
    readonly loader?: Importer<any> | undefined;
    readonly shouldComponentLoad?: ((props: any) => boolean) | undefined;
    readonly component?: ComponentType | any;
    readonly props?: {
        readonly [x: string]: any;
    } | undefined;
}>, action: Actions) => ModalStateMap;
export interface CloseModalParams {
    id: string;
}
export interface OpenModalParams {
    id: string;
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
export interface CloseAllModalParams {
}
export declare type ActionsMap = {
    [ModalActionType.OpenModal]: OpenModalParams;
    [ModalActionType.AddLazyModal]: AddLazyModalParams;
    [ModalActionType.LazyModalLoaded]: AddLazyModalParams;
    [ModalActionType.CloseModal]: CloseModalParams;
    [ModalActionType.RemoveModal]: CloseModalParams;
    [ModalActionType.CloseAllModals]: any;
};
export declare type Actions = {
    [Key in keyof ActionsMap]: {
        type: Key;
        payload: ActionsMap[Key];
    };
}[keyof ActionsMap];
export declare type ModalItem<T = any> = {
    id: string;
    opened: boolean;
    isLazy?: boolean;
    loaded?: boolean;
    loadFailed?: boolean;
    visible?: boolean;
    loader?: Importer;
    shouldComponentLoad?: (props: T) => boolean;
    component?: ComponentType | any;
    props?: {
        [key: string]: any;
    };
};
export declare type ModalStateMap = Map<string, ModalItem>;
