interface UpdateModalInput<T> {
    readonly modalId: string;
    readonly props?: T;
    readonly merge?: boolean;
}
declare type UseUpdateModalReturn<T> = (params: UpdateModalInput<T>) => void;
export declare const useUpdateModal: <T>() => UseUpdateModalReturn<T>;
export {};
