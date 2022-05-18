import { ModalItem } from './reducer';
import { ReactElement } from 'react';
declare type UseModalParams<T> = {
    id: string;
    keepAlive?: boolean;
    renderIfClosed?: boolean;
    render?: (props: ModalRenderProps<T>) => any;
};
export declare type ModalBasicProps<T> = {
    visible: boolean;
    [key: string]: any;
};
export declare function useModal<T = any>(params: UseModalParams<T> | string): [ReactElement, {
    loading: boolean;
    opened: boolean;
    open: (props?: T) => void;
    close: () => void;
    closeAll: () => void;
}];
declare type ModalRenderProps<T> = {
    [P in keyof T]?: T[P];
} & ModalItem;
export {};
