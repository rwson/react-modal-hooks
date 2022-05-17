import { ComponentType, PropsWithChildren } from 'react';
export declare type Importer<T = any> = () => Promise<{
    default: ComponentType<PropsWithChildren<T>>;
}>;
export declare type LazyModalItem = {
    loader: Importer;
};
export declare function withModals<T = any>(Component: ComponentType<PropsWithChildren<T>>): (modals: RegisterModalsParams) => (props: T) => JSX.Element;
export declare type RegisterModalsParams = {
    [key: string]: Importer;
};
