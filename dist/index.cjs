'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const react = require('react');
const reactRedux = require('react-redux');
const jsxRuntime = require('react/jsx-runtime');

const SchemeCheckContext = react.createContext({
  config: {}
});

function useSchemeCheck(featureId) {
  const { config } = react.useContext(SchemeCheckContext);
  const isFlagged = react.useMemo(() => {
    return config?.[featureId] !== undefined;
  }, [featureId, config]);
  const store = reactRedux.useStore();
  const state = store.getState();
  const getStateKeyValue = react.useCallback(
    (stateKey) => {
      let value = state;
      for (const key of stateKey.split(".")) {
        try {
          if (value === null) {
            value = void 0;
          } else if (typeof value === "object") {
            value = value?.[key];
          } else {
            value = void 0;
          }
        } catch {
          value = undefined;
          continue;
        }
      }
      if (value === null) {
        return undefined;
      }
      if (value instanceof Array || typeof value === "string" || typeof value === "boolean" || typeof value === "number" || typeof value === "object") {
        return value;
      }
      return undefined;
    },
    [state]
  );
  const isFlagReached = react.useMemo(() => {
    if (!isFlagged) {
      return false;
    }
    const limitation = config[featureId];
    let value;
    if (limitation?.stateKey !== undefined) {
      value = getStateKeyValue(limitation.stateKey);
    } else if (limitation?.stateSelector !== undefined) {
      value = limitation.stateSelector(state);
    }
    let exceeded = false;
    if (limitation?.flag !== undefined) {
      const limit = limitation.flag;
      if (limit.type === "toggle") {
        exceeded = value !== undefined;
      } else if (limit.type === "value") {
        exceeded = value === limit?.value;
      } else if (limit.type === "max") {
        try {
          exceeded = value?.length > (limit.count || 0);
        } catch {
          exceeded = false;
        }
      }
    } else if (limitation?.flagFunction !== undefined) {
      exceeded = limitation.flagFunction(value);
    }
    return exceeded;
  }, [isFlagged, featureId, config, state]);
  return {
    isFlagged,
    isFlagReached
  };
}

const SchemeCheckProvider = ({ children, config = {} }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(SchemeCheckContext.Provider, { value: { config }, children });
};

exports.SchemeCheckProvider = SchemeCheckProvider;
exports.useSchemeCheck = useSchemeCheck;
