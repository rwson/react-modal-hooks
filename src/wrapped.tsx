import React, { FC, ReactElement } from 'react';

import { WrappedModalComponentProps } from './types';

export const WrappedModalComponent: FC<WrappedModalComponentProps> = ({
  render,
  modalProps,
  opened,
  renderIfClosed
}: WrappedModalComponentProps): ReactElement | null => {
  if ((!opened && !renderIfClosed) || !render) {
    return null;
  }

  return <>{render(modalProps)}</>;
};
