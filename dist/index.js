import { createContext, useContext, useMemo, useCallback } from 'react';
import { useStore } from 'react-redux';
import { jsx } from 'react/jsx-runtime';

const SchemeCheckContext = createContext({
  config: {}
});

function useSchemeCheck(featureId) {
  const { config } = useContext(SchemeCheckContext);
  const isFlagged = useMemo(() => {
    return config?.[featureId] !== undefined;
  }, [featureId, config]);
  const store = useStore();
  const state = store.getState();
  const getStateKeyValue = useCallback(
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
  const isFlagReached = useMemo(() => {
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
  return /* @__PURE__ */ jsx(SchemeCheckContext.Provider, { value: { config }, children });
};

export { SchemeCheckProvider, useSchemeCheck };
