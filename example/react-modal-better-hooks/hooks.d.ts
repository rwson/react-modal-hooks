import { ReactElement } from 'react';
import { UseModalParams, UpdateModalParams } from './types';
export declare function useModal<T = any>(params: UseModalParams<T> | string): [ReactElement, {
    loading: boolean;
    opened: boolean;
    open: (props?: T) => void;
    update: (params: UpdateModalParams<T>) => void;
    close: () => void;
    closeAll: () => void;
}];
