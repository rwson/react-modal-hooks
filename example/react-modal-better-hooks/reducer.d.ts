import { Importer, Actions, ModalStateMap } from './types';
export declare const initialState: Map<any, any>;
export declare const reducer: (base: ReadonlyMap<string, {
    readonly id: string;
    readonly opened: boolean;
    readonly isLazy?: boolean | undefined;
    readonly loaded?: boolean | undefined;
    readonly loadFailed?: boolean | undefined;
    readonly visible?: boolean | undefined;
    readonly displayName?: string | undefined;
    readonly loader?: Importer<any> | undefined;
    readonly shouldComponentLoad?: ((props: any) => boolean) | undefined;
    readonly component?: any;
    readonly props?: {
        readonly [x: string]: any;
    } | undefined;
}>, action: Actions) => ModalStateMap;
