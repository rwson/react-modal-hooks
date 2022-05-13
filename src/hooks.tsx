import React, { useMemo, useEffect, ReactElement, cloneElement } from 'react';
import { ModalActionType } from './constants';
import { useModalContext } from './context';
import { ModalItem } from './reducer';
import merge from 'lodash/merge';
import WrappedModalComponent from './wrapped';

type UseModalParams<T> = {
  id: string;
  keepAlive?: boolean;
  renderIfClosed?: boolean;
  render?: (props: ModalRenderProps<T>) => any;
};

export type ModalBasicProps<T> = {
  visible: boolean;
  [key: string]: any;
};

export function useModal<T = any>(
  params: UseModalParams<T> | string
): [
  ReactElement,
  {
    opened: boolean;
    open: (props?: T) => void;
    close: () => void;
    closeAll: () => void;
  }
] {
  const { dispatch, state, defaultProps } = useModalContext();

  let opened: boolean = false;
  let props: any = {};

  let id, render, renderIfClosed, keepAlive;

  if (typeof params === 'string') {
    id = params;
  } else {
    id = params.id;
    keepAlive = params.keepAlive;
    renderIfClosed = params.renderIfClosed;
    render = params.render;
  }

  console.log(params)

  if (typeof keepAlive === 'undefined') {
    keepAlive = true;
  }

  if (renderIfClosed && !keepAlive) {
    throw new Error(`RHMB: 'keepAlive' should must be true when 'renderIfClosed' is true, not ${keepAlive}, Please check your code`)
  }

  let modal = state.modals.find((modal) => modal.id === id);

  useEffect(() => {
    modal = state.modals.find((modal) => modal.id === id);
  }, [state.modals]);

  if (modal) {
    props = (modal as any).props ?? {};
    props.visible = modal.opened;
    opened = modal.opened;

    if (modal.isLazy) {
      keepAlive = true;
      if (modal.loaded) {
        render = modal.component;
      } else {
        render = () => null;
      }
    }
  }

  useEffect(() => {
    return () => {
      if (!keepAlive) {
        dispatch(ModalActionType.RemoveModal, {
          id,
        });
      }
    };
  }, [keepAlive, id, dispatch]);

  const open = (props) =>
    dispatch(ModalActionType.OpenModal, {
      id,
      props: merge(props, defaultProps),
    });

  const close = () => {
    dispatch(ModalActionType.CloseModal, { id })
  };

  const closeAll = () => dispatch(ModalActionType.CloseAllModals);

  return [
    <WrappedModalComponent
      render={render}
      modalProps={props}
      opened={opened}
      renderIfClosed={renderIfClosed}
    />,
    {
      opened,
      open,
      close,
      closeAll,
    },
  ];
}

type ModalRenderProps<T> = {
  [P in keyof T]?: T[P];
} & ModalItem;
