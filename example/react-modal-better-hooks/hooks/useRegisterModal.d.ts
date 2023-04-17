import { ComponentType } from 'react';
import { Importer } from '../types';
interface ModalRegisterItem {
    readonly isLazy?: boolean;
    readonly component?: ComponentType;
    readonly loader?: Importer;
}
declare type RegisterModalInput = Record<string, ModalRegisterItem>;
declare type UseRegisterModalReturn = (modals: RegisterModalInput) => void;
export declare const useRegisterModal: () => UseRegisterModalReturn;
export {};
