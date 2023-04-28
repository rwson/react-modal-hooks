import { ComponentType } from 'react';
import { Importer } from '../types';
interface ModalRegisterItem {
    readonly isLazy?: boolean;
    readonly component?: ComponentType;
    readonly loader?: Importer;
}
declare type RegisterModalInput = Record<string, ModalRegisterItem>;
export declare const useRegisterModal: (modals: RegisterModalInput) => void;
export {};
