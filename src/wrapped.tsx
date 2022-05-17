import React, { memo, FC, ReactElement } from 'react';
import isEqual from 'lodash/isEqual';

type WrappedModalComponentProps = {
  renderIfClosed?: boolean;
  opened: boolean;
  render: (props: any) => any;
  modalProps: {
    [key: string]: any;
  };
};

const WrappedModalComponent: FC<WrappedModalComponentProps> = ({
  render,
  modalProps,
  opened,
  renderIfClosed,
}: WrappedModalComponentProps): ReactElement | null => {
  if (!opened && !renderIfClosed) {
    return null;
  }

  return <>{render(modalProps)}</>;
};

export default memo(WrappedModalComponent, isEqual);
