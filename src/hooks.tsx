import React, { useMemo, useEffect, useState, ReactElement, useCallback, createElement, useRef, cloneElement } from 'react';

import { ModalActionType } from './constants';
import { useModalContext } from './context';
import { ModalItem, ModalRenderProps, UseModalParams, UpdateModalParams } from './types';
import makeWrappedModalComponent, { WrappedModalComponent } from './wrapped';

export function useModal<T = any>(
  params: UseModalParams<T> | string
): [
  ReactElement,
  {
    loading: boolean,
    opened: boolean;
    open: (props?: T) => void;
    update: (params: UpdateModalParams<T>) => void;
    close: () => void;
    closeAll: () => void;
  }
] {
  const [ loading, setLoading ] = useState<boolean>(false);

  const propsRef = useRef<any>({});

  const { dispatch, state, defaultProps } = useModalContext();

  let opened: boolean = false;

  let id, render, renderIfClosed, keepAlive, ignoreEvent, displayName;

  if (typeof params === 'string') {
    id = params;
  } else {
    id = params.id;
    keepAlive = params.keepAlive;
    renderIfClosed = params.renderIfClosed;
    render = params.render;
    ignoreEvent = params.ignoreEvent;
    displayName = params.displayName;
  }

  if (typeof keepAlive === 'undefined') {
    keepAlive = true;
  }

  if (typeof ignoreEvent === 'undefined') {
    ignoreEvent = true;
  }

  if (renderIfClosed && !keepAlive) {
    throw new Error(
      `RHMB: 'keepAlive' should must be true when 'renderIfClosed' is true, not ${keepAlive}, Please check your code`
    );
  }

  const modal = useMemo<ModalItem | undefined>(() => state.get(id), [state, id]);

  if (modal) {
    propsRef.current = Object.assign({}, modal.props, {
      visible: modal.opened
    });
    opened = modal.opened;

    if (modal.isLazy) {
      keepAlive = true;
      displayName = modal.displayName;

      if (modal.loaded) {
        render = modal.component;
      } else {
        render = () => null;
      }
    }
  }

  const open = useCallback(async(openProps) => {
    //  Avoid to load a same modal more than one time
    if (loading) {
      return;
    }

    setLoading(true);

    const paramsIsEvent = Boolean(openProps?.target ?? null)
    let extraProps = {}

    if (!ignoreEvent && paramsIsEvent) {
      extraProps = {
        event: openProps
      }
    }

    if (!paramsIsEvent) {
      extraProps = openProps
    }

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
      props: Object.assign({}, defaultProps, extraProps, propsRef.current)
    })
  }, [id, propsRef.current, modal, loading]);

  const update = useCallback(({ merge, props }: UpdateModalParams<T>) => {
    if (merge) {
      propsRef.current = Object.assign({}, defaultProps, propsRef.current, props);
    } else {
      propsRef.current = Object.assign({}, defaultProps, props);
    }

    dispatch(ModalActionType.UpdateModal, {
      id,
      props: Object.assign({}, defaultProps, propsRef.current)
    });
  }, [id, propsRef, modal]);

  const close = useCallback(() => {
    dispatch(ModalActionType.CloseModal, { id });
  }, [id]);

  const closeAll = useCallback(() => dispatch(ModalActionType.CloseAllModals), []);

  useEffect(() => {
    return () => {
      if (!keepAlive) {
        dispatch(ModalActionType.RemoveModal, {
          id,
        });
      }
    };
  }, [keepAlive, id, dispatch]);

  if (propsRef.current.displayName) {
    displayName = propsRef.current.displayName;
    delete propsRef.current.displayName;
  }

  return [
    createElement(WrappedModalComponent, {
      modalProps: propsRef.current,
      render: render,
      renderIfClosed: renderIfClosed,
      opened
    }),
    {
      opened,
      loading,
      open,
      update,
      close,
      closeAll,
    }
  ];
}
