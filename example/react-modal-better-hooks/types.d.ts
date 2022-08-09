import { ComponentType, PropsWithChildren } from 'react';
import { ModalActionType } from './constants';
export declare type WrappedModalComponentProps = {
    renderIfClosed?: boolean;
    opened: boolean;
    render: (props: any) => any;
    modalProps: {
        [key: string]: any;
    };
};
export declare type Importer<T = any> = () => Promise<{
    default: ComponentType<PropsWithChildren<T>>;
}>;
export declare type LazyModalItem<T = any> = {
    loader: Importer;
    shouldComponentLoad(props: T): boolean;
};
export declare type RegisterModalsParams<T = any> = {
    [key: string]: Importer | LazyModalItem<T>;
};
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
export declare type ModalRenderProps<T> = {
    [K in keyof T]?: T[K];
} & ModalItem;
export declare type Dispatcher = <Type extends Actions['type'], Payload extends ActionsMap[Type]>(type: Type | any, ...payload: Payload extends undefined ? [undefined?] : [Payload] | any) => void;
export declare type UseModalParams<T> = {
    id: string;
    ignoreEvent?: boolean;
    keepAlive?: boolean;
    renderIfClosed?: boolean;
    render?: (props: ModalBasicProps<T>) => any;
};
export declare type ModalBasicProps<T> = {
    [K in keyof T]?: T[K];
} & {
    visible: boolean;
};
