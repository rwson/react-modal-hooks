import React from 'react';
declare type WrappedModalComponentProps = {
    renderIfClosed?: boolean;
    opened: boolean;
    render: (props: any) => any;
    modalProps: {
        [key: string]: any;
    };
};
declare const _default: React.NamedExoticComponent<WrappedModalComponentProps>;
export default _default;
