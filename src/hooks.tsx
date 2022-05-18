import { ModalActionType } from './constants';
import { useModalContext } from './context';
import { ModalItem } from './reducer';
import WrappedModalComponent from './wrapped';
import merge from 'lodash/merge';
import produce from 'immer';
import React, { useMemo, useEffect, useState, ReactElement, cloneElement, useCallback } from 'react';

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
    loading: boolean,
    opened: boolean;
    open: (props?: T) => void;
    close: () => void;
    closeAll: () => void;
  }
] {
  const [ loading, setLoading ] = useState<boolean>(false);
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

  if (typeof keepAlive === 'undefined') {
    keepAlive = true;
  }

  if (renderIfClosed && !keepAlive) {
    throw new Error(
      `RHMB: 'keepAlive' should must be true when 'renderIfClosed' is true, not ${keepAlive}, Please check your code`
    );
  }

  const modal = useMemo<ModalItem | undefined>(() => state.get(id), [state, id]);

  if (modal) {
    props = Object.assign({}, modal.props, {
      visible: modal.opened
    });
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

  const open = useCallback(async(props) => {
    if (loading) {
      return;
    }

    setLoading(true);

    const module = await modal?.loader?.()

    if (module?.default) {
      dispatch(ModalActionType.LazyModalLoaded, {
        loaded: true,
        loadFailed: false,
        component: module?.default,
        id
      });
    }

    setLoading(false);

    dispatch(ModalActionType.OpenModal, {
      id,
      props: merge(props, defaultProps),
    })
  }, [id, props, modal, loading]);

  const close = useCallback(() => {
    dispatch(ModalActionType.CloseModal, { id });
  }, [id]);

  const closeAll = useCallback(() => dispatch(ModalActionType.CloseAllModals), []);

  return [
    <WrappedModalComponent
      render={render}
      modalProps={props}
      opened={opened}
      renderIfClosed={renderIfClosed}
    />,
    {
      opened,
      loading,
      open,
      close,
      closeAll,
    },
  ];
}

type ModalRenderProps<T> = {
  [P in keyof T]?: T[P];
} & ModalItem;
