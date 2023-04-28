interface UpdateModalInput<T> {
    readonly merge?: boolean;
    readonly props: T;
}
declare type UseUpdateModalReturn<T> = (id: string, params: UpdateModalInput<T>) => void;
export declare const useUpdateModal: <T>() => UseUpdateModalReturn<T>;
export {};
