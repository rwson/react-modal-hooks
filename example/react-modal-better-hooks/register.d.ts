import { ComponentType, PropsWithChildren } from 'react';
import { RegisterModalsParams } from './types';
export declare function withModals<T>(Component: ComponentType<PropsWithChildren<T>>): (modals: RegisterModalsParams<T>) => (props: T) => JSX.Element;
