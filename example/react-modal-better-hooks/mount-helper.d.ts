import { ReactElement } from 'react';
export declare class MountHelper {
    domNode: HTMLElement | null;
    constructor(mountNode?: string);
    mount(element: ReactElement): () => void;
}
