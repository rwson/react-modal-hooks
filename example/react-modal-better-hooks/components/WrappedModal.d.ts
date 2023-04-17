import { FC } from 'react';
interface WrappedModalProps {
    render: any;
    visible: boolean;
    renderProps?: Record<string, any>;
}
export declare const WrappedModal: FC<WrappedModalProps>;
export {};
