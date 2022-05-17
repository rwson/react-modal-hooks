import { ModalActionType } from './constants';
import { Importer } from './register';
import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';
import { ComponentType } from 'react';
import { isEqual } from 'lodash';

export const initialState = new Map();

export const reducer = produce(
  (state: ModalStateMap, action: Actions): ModalStateMap => {
    const { id: payloadId, props: payloadProps, loader, component, loadFailed, loaded } = action.payload ?? {};
    const allKeys: Array<string> = Array.from(state.keys());
    const registed: boolean = state.has(payloadId);

    let currentModal: ModalItem | undefined = state.get(payloadId);

    switch (action.type) {
      case ModalActionType.OpenModal:
        if (registed) {
          if (currentModal) {
            currentModal.opened = true;
            currentModal.props = payloadProps;
          }
        } else {
          currentModal = Object.assign({}, action.payload, {
            opened: true,
          });
        }

        state.set(payloadId, currentModal as ModalItem);
        return state;

      case ModalActionType.CloseModal:
        if (currentModal) {
          currentModal.opened = false;
          state.set(payloadId, currentModal);
        }
        return state;

      case ModalActionType.CloseAllModals:
        allKeys.forEach((key: string) => {
          currentModal = state.get(key) as ModalItem;
          currentModal.opened = false;
          state.set(key, currentModal);
        });
        return state;

      case ModalActionType.AddLazyModal:
        if (!registed) {
          state.set(payloadId, {
            id: payloadId,
            loaded: false,
            isLazy: true,
            loadFailed: false,
            loader,
          } as ModalItem);
        }
        return state;

      case ModalActionType.LazyModalLoaded:
        if (currentModal) {
          currentModal.loaded = loaded;
          currentModal.loadFailed = loadFailed;
          currentModal.component = component;
          state.set(payloadId, currentModal as ModalItem);
        }

        return state;

      default:
        return state;
    }
  }
);

export interface CloseModalParams {
  id: string;
}

export interface OpenModalParams {
  id: string;
  props?: {
    [key: string]: any;
  };
}

export interface AddLazyModalParams {
  id: string;
  isLazy?: boolean;
  loaded?: boolean;
  loadFailed?: boolean;
  loader?: Importer;
  component?: ComponentType | any;
  props?: {
    [key: string]: any;
  };
}

export interface CloseAllModalParams {}

export type ActionsMap = {
  [ModalActionType.OpenModal]: OpenModalParams;
  [ModalActionType.AddLazyModal]: AddLazyModalParams;
  [ModalActionType.LazyModalLoaded]: AddLazyModalParams;
  [ModalActionType.CloseModal]: CloseModalParams;
  [ModalActionType.RemoveModal]: CloseModalParams;
  [ModalActionType.CloseAllModals]: any;
};

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  };
}[keyof ActionsMap];

export type ModalItem = {
  id: string;
  opened: boolean;
  isLazy?: boolean;
  loaded?: boolean;
  loadFailed?: boolean;
  visible?: boolean;
  loader?: Importer;
  component?: ComponentType | any;
  props?: {
    [key: string]: any;
  };
};

export type ModalStateMap = Map<string, ModalItem>;
