import produce, { enableAllPlugins } from 'immer';
import React, { useMemo, createElement, useEffect, useReducer, useCallback, useContext, createContext, useState, useRef } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var ModalActionType;

(function (ModalActionType) {
  ModalActionType["OpenModal"] = "OpenModal";
  ModalActionType["UpdateModal"] = "UpdateModal";
  ModalActionType["CloseModal"] = "CloseModal";
  ModalActionType["CloseAllModals"] = "CloseAllModals";
  ModalActionType["RemoveModal"] = "RemoveModal";
  ModalActionType["RegisterModal"] = "RegisterModal";
  ModalActionType["LazyModalLoaded"] = "LazyModalLoaded";
  ModalActionType["LoadLazyModal"] = "LoadLazyModal";
})(ModalActionType || (ModalActionType = {}));

var initialState = /*#__PURE__*/new Map();
var reducer = /*#__PURE__*/produce(function (state, action) {
  var _action$payload;

  var _ref = (_action$payload = action.payload) != null ? _action$payload : {},
      payloadId = _ref.id,
      payloadProps = _ref.props,
      component = _ref.component,
      loadFailed = _ref.loadFailed,
      loaded = _ref.loaded,
      __mergeProps___ = _ref.__mergeProps___;

  var allKeys = Array.from(state.keys());
  var registed = state.has(payloadId);
  var currentModal = state.get(payloadId);

  switch (action.type) {
    case ModalActionType.OpenModal:
      if (currentModal) {
        currentModal.visible = true;
        currentModal.props = Object.assign({}, payloadProps != null ? payloadProps : {});
        state.set(payloadId, currentModal);
      }

      return state;

    case ModalActionType.UpdateModal:
      if (currentModal) {
        var oldPorps = {};

        if (__mergeProps___) {
          var _currentModal$props;

          oldPorps = (_currentModal$props = currentModal.props) != null ? _currentModal$props : {};
        }

        currentModal.props = Object.assign({}, oldPorps, payloadProps != null ? payloadProps : {});
        state.set(payloadId, currentModal);
      }

      return state;

    case ModalActionType.CloseModal:
      if (currentModal) {
        currentModal.visible = false;
        state.set(payloadId, currentModal);
      }

      return state;

    case ModalActionType.CloseAllModals:
      allKeys.forEach(function (key) {
        currentModal = state.get(key);
        currentModal.visible = false;
        state.set(key, currentModal);
      });
      return state;

    case ModalActionType.RegisterModal:
      if (!registed) {
        state.set(payloadId, _extends({}, action.payload, {
          id: payloadId,
          props: {}
        }));
      }

      return state;

    case ModalActionType.RemoveModal:
      state["delete"](payloadId);
      return state;

    case ModalActionType.LoadLazyModal:
      if (currentModal) {
        currentModal.loading = true;
        currentModal.loadFailed = false;
      }

      return state;

    case ModalActionType.LazyModalLoaded:
      if (currentModal) {
        currentModal.loaded = loaded;
        currentModal.loadFailed = loadFailed;
        currentModal.loading = false;
        currentModal.component = component;
        state.set(payloadId, currentModal);
      }

      return state;

    default:
      return state;
  }
});

var WrappedModal = function WrappedModal(_ref) {
  var render = _ref.render,
      visible = _ref.visible,
      renderProps = _ref.renderProps;

  if (!visible || !render) {
    return null;
  }

  var props = Object.assign({}, renderProps != null ? renderProps : {}, {
    visible: visible
  });
  return React.createElement(React.Fragment, null, render(props));
};

var ModalAutoMounter = function ModalAutoMounter() {
  var _useModalContext = useModalContext(),
      state = _useModalContext.state,
      dispatch = _useModalContext.dispatch,
      defaultProps = _useModalContext.defaultProps;

  var mountableCompnent = useMemo(function () {
    var entries = state.values();
    var components = [];

    for (var _iterator = _createForOfIteratorHelperLoose(entries), _step; !(_step = _iterator()).done;) {
      var entry = _step.value;

      if (entry.component) {
        components.push(createElement(WrappedModal, _extends({}, defaultProps || {}, {
          render: entry.component,
          renderProps: entry.props,
          visible: entry.visible,
          key: entry.id
        })));
      }
    }

    return components;
  }, [state]);
  useEffect(function () {
    var entries = state.values();

    var _loop = function _loop() {
      var entry = _step2.value;

      if (entry.isLazy && !entry.loaded) {
        dispatch(ModalActionType.LoadLazyModal, {
          id: entry.id
        });
        var loader = entry.loader;
        loader == null ? void 0 : loader().then(function (instance) {
          dispatch(ModalActionType.LazyModalLoaded, {
            id: entry.id,
            component: instance["default"],
            loadFailed: false,
            loaded: true
          });
        });
      }
    };

    for (var _iterator2 = _createForOfIteratorHelperLoose(entries), _step2; !(_step2 = _iterator2()).done;) {
      _loop();
    }
  }, [state]);
  return React.createElement(React.Fragment, null, mountableCompnent);
};

var ModalContext = /*#__PURE__*/createContext({
  state: initialState,
  dispatch: function dispatch() {
    return undefined;
  },
  defaultProps: {}
});
ModalContext.displayName = 'RMBH_Context';
var ModalProvider = function ModalProvider(_ref) {
  var children = _ref.children,
      _ref$defaultProps = _ref.defaultProps,
      defaultProps = _ref$defaultProps === void 0 ? {} : _ref$defaultProps;

  var _useReducer = useReducer(reducer, initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1]; //  @ts-ignore


  var dispatchAction = useCallback(function (type, payload) {
    dispatch({
      type: type,
      payload: payload
    });
  }, []);
  var value = {
    state: state,
    defaultProps: defaultProps,
    dispatch: dispatchAction
  };
  return React.createElement(ModalContext.Provider, {
    value: value
  }, React.createElement(React.Fragment, null, React.createElement(ModalAutoMounter, null), children));
};
var useModalContext = function useModalContext() {
  return useContext(ModalContext);
};

var useOpenModal = function useOpenModal() {
  var _useState = useState(false);

  var _useModalContext = useModalContext(),
      state = _useModalContext.state,
      dispatch = _useModalContext.dispatch;

  var open = function open(id, props) {
    var modalItem = state.get(id);
    var modalProps = props != null ? props : {};

    if (modalItem != null && modalItem.isLazy && !(modalItem != null && modalItem.loaded) && !modalItem.loading) {
      var loader = modalItem.loader;
      dispatch(ModalActionType.LoadLazyModal, {
        id: id
      });
      loader == null ? void 0 : loader().then(function (instance) {
        dispatch(ModalActionType.LazyModalLoaded, {
          id: modalItem.id,
          component: instance["default"],
          loadFailed: false,
          loaded: true
        });
        setTimeout(function () {
          dispatch(ModalActionType.OpenModal, {
            id: id,
            props: modalProps
          });
        }, 30);
      });
      return;
    }

    dispatch(ModalActionType.OpenModal, {
      id: id,
      props: modalProps
    });
  };

  return open;
};

var useCloseModal = function useCloseModal() {
  var _useModalContext = useModalContext(),
      dispatch = _useModalContext.dispatch;

  var closeModal = function closeModal(id) {
    return dispatch(ModalActionType.CloseModal, {
      id: id
    });
  };

  var closeAllModals = function closeAllModals() {
    return dispatch(ModalActionType.CloseAllModals);
  };

  return {
    closeModal: closeModal,
    closeAllModals: closeAllModals
  };
};

var useUpdateModal = function useUpdateModal() {
  var _useModalContext = useModalContext(),
      state = _useModalContext.state,
      dispatch = _useModalContext.dispatch;

  var update = useCallback(function (id, _ref) {
    var merge = _ref.merge,
        props = _ref.props;
    dispatch(ModalActionType.UpdateModal, {
      id: id,
      props: props,
      __mergeProps___: merge
    });
  }, [state]);
  return update;
};

var useModalIsLoading = function useModalIsLoading(modalIds) {
  var _useModalContext = useModalContext(),
      state = _useModalContext.state;

  return useMemo(function () {
    var ids = Array.isArray(modalIds) ? modalIds : [modalIds];
    var modals = ids.map(function (id) {
      return state.get(id);
    }).filter(Boolean);

    if (!modals.length) {
      return false;
    }

    return modals.some(function (modal) {
      return modal != null && modal.isLazy ? modal.loading : false;
    });
  }, [state, modalIds]);
};

var useRegisterModal = function useRegisterModal(modals) {
  var _useModalContext = useModalContext(),
      dispatch = _useModalContext.dispatch,
      state = _useModalContext.state;

  var mountRef = useRef(false);
  var diffModals = useMemo(function () {
    return Object.keys(modals).reduce(function (result, modalId) {
      var _extends2;

      if (state.get(modalId)) {
        return result;
      }

      return _extends({}, result, (_extends2 = {}, _extends2[modalId] = modals[modalId], _extends2));
    }, {});
  }, [modals, state]);
  useEffect(function () {
    Object.keys(diffModals).forEach(function (modalId) {
      var registerItem = diffModals[modalId];
      var modalItem = {
        id: modalId,
        isLazy: registerItem.isLazy,
        component: registerItem.component,
        loader: registerItem.loader
      };

      if (modalItem.isLazy) {
        modalItem.loaded = false;
        modalItem.loading = false;
        modalItem.loadFailed = false;
      }

      dispatch(ModalActionType.RegisterModal, modalItem);
    });
  }, [diffModals]);
};

enableAllPlugins();

export { ModalProvider, useCloseModal, useModalIsLoading, useOpenModal, useRegisterModal, useUpdateModal };
//# sourceMappingURL=react-modal-better-hooks.esm.js.map
