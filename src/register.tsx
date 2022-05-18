import { ModalActionType } from './constants';
import { useModalContext } from './context';
import { ModalItem } from './reducer';
import React, {
  ComponentType,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';

export type Importer<T = any> = () => Promise<{
  default: ComponentType<PropsWithChildren<T>>;
}>;

export type LazyModalItem<T> = {
  loader: Importer;
  shouldComponentLoad(props: T): boolean;
};

function moduleLoader<T>(importer: Importer | LazyModalItem<T>) {
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

export function withModals<T = any>(
  Component: ComponentType<PropsWithChildren<T>>
) {
  return (modals: RegisterModalsParams<T>) => (props: T) => {
    const { dispatch, state } = useModalContext();

    const loadModal = useCallback(
      async (id: string) => {
        const modal = state.get(id) as ModalItem<T>;

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
            console.log(e);

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

    const loadModals = useCallback(() => {
      const keys: string[] = Object.keys(modals);

      for (const key of keys) {
        const lazyModalItem: Importer | LazyModalItem<T> = modals[key]

        dispatch(ModalActionType.AddLazyModal, {
          id: key,
          shouldComponentLoad: (lazyModalItem as LazyModalItem<T>).shouldComponentLoad,
          loader: moduleLoader<T>(lazyModalItem),
        });
      }
    }, [modals]);

    useEffect(() => {
      loadModals();
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

export type RegisterModalsParams<T> = {
  [key: string]: Importer | LazyModalItem<T>;
};
