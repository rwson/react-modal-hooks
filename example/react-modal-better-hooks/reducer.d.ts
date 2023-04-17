/// <reference types="react" />
import { Importer, Actions, ModalStateMap } from './types';
export declare const initialState: Map<any, any>;
export declare const reducer: (base: ReadonlyMap<string, {
    readonly id: string;
    readonly visible: boolean;
    readonly isLazy?: boolean | undefined;
    readonly loaded?: boolean | undefined;
    readonly loading?: boolean | undefined;
    readonly loadFailed?: boolean | undefined;
    readonly loader?: Importer<any> | undefined;
    readonly component?: import("react").ComponentClass<{}, any> | import("react").FunctionComponent<{}> | undefined;
    readonly props?: {
        readonly [x: string]: any;
    } | undefined;
}>, action: Actions) => ModalStateMap;
