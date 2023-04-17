interface OpenModalInput<T> {
    readonly modalId: string;
    readonly props?: T;
}
declare type UseOpenModalReturn<T> = (params: OpenModalInput<T>) => void | undefined;
export declare const useOpenModal: <T>() => UseOpenModalReturn<T>;
export {};
