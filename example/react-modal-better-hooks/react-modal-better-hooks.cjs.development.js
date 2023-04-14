'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var produce = require('immer');
var produce__default = _interopDefault(produce);
var React = require('react');
var React__default = _interopDefault(React);

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
var reducer = /*#__PURE__*/produce__default(function (state, action) {
  var _action$payload;

  var _ref = (_action$payload = action.payload) != null ? _action$payload : {},
      payloadId = _ref.id;

  var allKeys = Array.from(state.keys());
  var registed = state.has(payloadId);
  var currentModal = state.get(payloadId);

  switch (action.type) {
    // case ModalActionType.OpenModal:
    //   if (registed) {
    //     if (currentModal) {
    //       currentModal.opened = true
    //       currentModal.props = payloadProps
    //     }
    //   } else {
    //     currentModal = Object.assign({}, action.payload, {
    //       opened: true,
    //     })
    //   }
    //   state.set(payloadId, currentModal as ModalItem)
    //   return state
    // case ModalActionType.UpdateModal:
    //   if (currentModal) {
    //     currentModal.opened = true
    //     currentModal.props = payloadProps
    //     state.set(payloadId, currentModal as ModalItem)
    //   }
    // return state
    // case ModalActionType.CloseModal:
    //   if (currentModal) {
    //     currentModal.opened = false
    //     state.set(payloadId, currentModal)
    //   }
    //   return state
    // case ModalActionType.CloseAllModals:
    //   allKeys.forEach((key: string) => {
    //     currentModal = state.get(key) as ModalItem
    //     currentModal.opened = false
    //     state.set(key, currentModal)
    //   })
    //   return state
    case ModalActionType.RegisterModal:
      if (!registed) {
        state.set(payloadId, _extends({}, action.payload, {
          id: payloadId,
          props: {}
        }));
      }

      return state;

    case ModalActionType.LoadLazyModal:
      if (currentModal) {
        currentModal.loading = true;
        currentModal.loadFailed = false;
      }

      return state;
    // case ModalActionType.LazyModalLoaded:
    //   if (currentModal) {
    //     currentModal.loaded = loaded
    //     currentModal.loadFailed = loadFailed
    //     currentModal.loading = false
    //     currentModal.component = component
    //     state.set(payloadId, currentModal as ModalItem)
    //   }
    //   return state

    default:
      return state;
  }
});

var WrappedModalComponent = function WrappedModalComponent(_ref) {
  var render = _ref.render,
      modalProps = _ref.modalProps,
      opened = _ref.opened,
      renderIfClosed = _ref.renderIfClosed;

  if (!opened && !renderIfClosed || !render) {
    return null;
  }

  return React__default.createElement(React__default.Fragment, null, render(modalProps));
};
var Mounter = function Mounter() {
  var _useModalContext = useModalContext(),
      state = _useModalContext.state,
      dispatch = _useModalContext.dispatch;

  var mountableCompnent = React.useMemo(function () {
    var entries = state.values();
    var components = [];

    for (var _iterator = _createForOfIteratorHelperLoose(entries), _step; !(_step = _iterator()).done;) {
      var entry = _step.value;

      if (entry.component) {
        components.push(React.createElement(WrappedModalComponent, {
          render: entry.component,
          modalProps: {},
          renderIfClosed: false,
          opened: false,
          key: entry.id
        }));
      }
    }

    return components;
  }, [state]);
  React.useEffect(function () {
    var entries = state.values();

    var _loop = function _loop() {
      var entry = _step2.value;

      if (entry.isLazy && !entry.loaded) {
        dispatch(ModalActionType.LoadLazyModal, {
          id: entry.id
        });

        try {
          var loader = entry.loader;
          loader == null ? void 0 : loader().then(function (instance) {
            console.log(instance);
            dispatch(ModalActionType.LazyModalLoaded, {
              id: entry.id
            });
          });
        } catch (err) {}
      }
    };

    for (var _iterator2 = _createForOfIteratorHelperLoose(entries), _step2; !(_step2 = _iterator2()).done;) {
      _loop();
    }
  }, [state]);
  return React__default.createElement(React__default.Fragment, null, mountableCompnent);
};

var ModalContext = /*#__PURE__*/React.createContext({
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

  var _useReducer = React.useReducer(reducer, initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1]; //  @ts-ignore


  var dispatchAction = React.useCallback(function (type, payload) {
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
  return React__default.createElement(ModalContext.Provider, {
    value: value
  }, React__default.createElement(React__default.Fragment, null, React__default.createElement(Mounter, null), children));
};
var useModalContext = function useModalContext() {
  return React.useContext(ModalContext);
};

var useOpenModal = function useOpenModal() {
  var _useState = React.useState(false);

  var _useModalContext = useModalContext(),
      state = _useModalContext.state;

  var open = function open(modalId, props) {
    var modalItem = state.get(modalId);
    throw new TypeError("modalId(" + modalId + ") doesn't exist, cannot find corresponding 'modal' component, please check this");
  };

  return open;
};

var useCloseModal = function useCloseModal() {
  var _useModalContext = useModalContext(),
      dispatch = _useModalContext.dispatch;

  var close = function close(modalId) {
    return dispatch(ModalActionType.CloseModal, {
      modalId: modalId
    });
  };

  var closeAll = function closeAll() {
    return dispatch(ModalActionType.CloseAllModals);
  };

  return {
    close: close,
    closeAll: closeAll
  };
};

var useUpdateModal = function useUpdateModal() {
  var _useModalContext = useModalContext();

  var update = function update() {};

  return update;
};

var useRegisterModal = function useRegisterModal() {
  var register = function register(modals) {
    var _useModalContext = useModalContext(),
        dispatch = _useModalContext.dispatch,
        state = _useModalContext.state;

    React.useEffect(function () {
      Object.keys(modals).forEach(function (modalId) {
        var registerItem = modals[modalId];
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
    }, [modals, state]);
  };

  return register;
};

produce.enableAllPlugins();

exports.ModalProvider = ModalProvider;
exports.useCloseModal = useCloseModal;
exports.useOpenModal = useOpenModal;
exports.useRegisterModal = useRegisterModal;
exports.useUpdateModal = useUpdateModal;
//# sourceMappingURL=react-modal-better-hooks.cjs.development.js.map
