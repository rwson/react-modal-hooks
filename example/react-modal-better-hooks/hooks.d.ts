import { ReactElement } from 'react';
import { UseModalParams } from './types';
export declare function useModal<T = any>(params: UseModalParams<T> | string): [ReactElement, {
    loading: boolean;
    opened: boolean;
    open: (props?: T) => void;
    close: () => void;
    closeAll: () => void;
}];
