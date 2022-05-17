import { ModalActionType } from './constants';
import { useModalContext } from './context';
import React, {
  ComponentType,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';

export type Importer<T = any> = () => Promise<{
  default: ComponentType<PropsWithChildren<T>>;
}>;

export type LazyModalItem = {
  loader: Importer;
};

const moduleLoader = (importer: Importer) => async () => {
  const module = await importer();
  return module;
};

export function withModals<T = any>(
  Component: ComponentType<PropsWithChildren<T>>
) {
  return (modals: RegisterModalsParams) => (props: T) => {
    const { dispatch, state } = useModalContext();

    const loadModal = useCallback(
      async (id: string) => {
        const modal = state.get(id);
        if (modal) {
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

    const loadModals = useCallback(() => {
      const keys: string[] = Object.keys(modals);

      for (const key of keys) {
        dispatch(ModalActionType.AddLazyModal, {
          id: key,
          loader: moduleLoader(modals[key]),
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

export type RegisterModalsParams = {
  [key: string]: Importer;
};
