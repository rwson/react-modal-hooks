import React, {
  ComponentType,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';

import { ModalActionType } from './constants';
import { useModalContext } from './context';
import { Importer, LazyModalItem, RegisterModalsParams, ModalItem } from './types';

function moduleLoader(importer: Importer | LazyModalItem) {
  return async () => {
    let loader: any;
    if (typeof importer === 'function') {
      loader = importer;
    } else {
      loader = importer.loader;
    }

    const module = await loader();
    return module;
  }
}

export function withModals<T>(
  Component: ComponentType<PropsWithChildren<T>>
) {
  return (modals: RegisterModalsParams<T>) => (props: T) => {
    const { dispatch, state } = useModalContext();

    const loadModal = useCallback(
      async (id: string) => {
        const modal = state.get(id) as ModalItem;

        console.log(state)

        if (modal) {
          if (modal.shouldComponentLoad && !modal.shouldComponentLoad?.(props)) {
            return;
          }

          try {
            //  When unload modal and module load failed, try reload module
            if (!modal.loaded || modal.loadFailed) {
              const module = await modal.loader?.();

              dispatch(ModalActionType.LazyModalLoaded, {
                loaded: true,
                loadFailed: false,
                component: module?.default,
                id,
              });
            }
          } catch (e) {
            dispatch(ModalActionType.LazyModalLoaded, {
              loaded: false,
              loadFailed: true,
              id,
            });
          }
        }
      },
      [state]
    );

    const addModalsToState = useCallback(() => {
      const keys: string[] = Object.keys(modals);

      for (const key of keys) {
        const lazyModalItem: Importer | LazyModalItem = modals[key]

        console.log(lazyModalItem)

        dispatch(ModalActionType.AddLazyModal, {
          id: key,
          displayName: (lazyModalItem as LazyModalItem).displayName,
          shouldComponentLoad: (lazyModalItem as LazyModalItem).shouldComponentLoad,
          loader: moduleLoader(lazyModalItem)
        });
      }
    }, [modals]);

    useEffect(() => {
      addModalsToState();
    }, [modals]);

    useEffect(() => {
      const keys: Array<string> = Array.from(state.keys());

      for (const key of keys) {
        loadModal(key);
      }
    }, [state]);

    return <Component {...props} />;
  };
}
