import { ReactElement } from 'react';
import { UseModalParams, UpdateModalParams } from './types';
interface UseModalCloseReturn {
    close: (id: string) => void;
    closeAll: () => void;
}
interface UseModalReturn<T> extends UseModalCloseReturn {
    loading: boolean;
    open: (props?: T) => void;
    update: (params: UpdateModalParams<T>) => void;
    close: (id?: string) => void;
}
export declare function useModal<T = any>(params: UseModalParams<T> | string): [ReactElement, UseModalReturn<T>];
export declare function useCloseModal(): UseModalCloseReturn;
export {};
