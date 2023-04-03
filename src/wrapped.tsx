import React, { FC, ReactElement } from 'react';
import isEqual from 'lodash/isEqual';

import { WrappedModalComponentProps } from './types';

export const WrappedModalComponent: FC<WrappedModalComponentProps> = ({
  render,
  modalProps,
  opened,
  renderIfClosed
}: WrappedModalComponentProps): ReactElement | null => {
  if (!opened && !renderIfClosed) {
    return null;
  }

  return <>{render(modalProps)}</>;
};

const makeWrappedModalComponent = (displayName?: string) => {
  const _WrappedModalComponent: FC<WrappedModalComponentProps> = ({
    render,
    modalProps,
    opened,
    renderIfClosed
  }: WrappedModalComponentProps): ReactElement | null => {
    if (!opened && !renderIfClosed) {
      return null;
    }
  
    return <>{render(modalProps)}</>;
  };

  _WrappedModalComponent.displayName = displayName || 'RMBH_WrappedModalComponent';

  return _WrappedModalComponent
};

export default makeWrappedModalComponent;
