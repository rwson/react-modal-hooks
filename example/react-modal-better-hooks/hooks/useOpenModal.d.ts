declare type UseOpenModalReturn<T> = (id: string, props?: T) => void | undefined;
export declare const useOpenModal: <T extends unknown>() => UseOpenModalReturn<T>;
export {};
