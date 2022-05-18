import { ComponentType, PropsWithChildren } from 'react';
export declare type Importer<T = any> = () => Promise<{
    default: ComponentType<PropsWithChildren<T>>;
}>;
export declare type LazyModalItem<T> = {
    loader: Importer;
    shouldComponentLoad(props: T): boolean;
};
export declare function withModals<T = any>(Component: ComponentType<PropsWithChildren<T>>): (modals: RegisterModalsParams<T>) => (props: T) => JSX.Element;
export declare type RegisterModalsParams<T> = {
    [key: string]: Importer | LazyModalItem<T>;
};
