import { useContext, useMemo, useCallback } from 'react';
import { useStore } from 'react-redux';

// import { RootStateType } from './store';
import { SchemeCheckContext } from './context';

function useSchemeCheck<RootState = unknown>(featureId: string) {
  const { config } = useContext(SchemeCheckContext);
  const isFlagged = useMemo(() => {
    return config?.[featureId] !== undefined;
  }, [featureId, config]);
  const store = useStore<RootState>();
  const state = store.getState();
  const getStateKeyValue = useCallback(
    (stateKey: string) => {
      let value: unknown = state;
      for (const key of stateKey.split('.')) {
        try {
          if (value === null) {
            value = undefined;
          } else if (typeof value === 'object') {
            // @ts-expect-error key type 'string' not found on type '{}'
            value = value?.[key];
          } else {
            value = undefined;
          }
        } catch {
          value = undefined;
          continue;
        }
      }
      if (value === null) {
        return undefined;
      }
      if (
        value instanceof Array ||
        typeof value === 'string' ||
        typeof value === 'boolean' ||
        typeof value === 'number' ||
        typeof value === 'object'
      ) {
        return value;
      }
      return undefined;
    },
    [state],
  );
  const isFlagReached = useMemo(() => {
    if (!isFlagged) {
      return false;
    }
    const limitation = config[featureId];
    let value: unknown;
    if (limitation?.stateKey !== undefined) {
      value = getStateKeyValue(limitation.stateKey);
    } else if (limitation?.stateSelector !== undefined) {
      value = limitation.stateSelector(state);
    }

    let exceeded = false;
    if (limitation?.flag !== undefined) {
      const limit = limitation.flag;
      if (limit.type === 'toggle') {
        exceeded = value !== undefined;
      } else if (limit.type === 'value') {
        exceeded = value === limit?.value;
      } else if (limit.type === 'max') {
        try {
          // @ts-expect-error property 'length' does not exists on type '{}'
          exceeded = value?.length > (limit.count || 0);
        } catch {
          exceeded = false;
        }
      }
    } else if (limitation?.flagFunction !== undefined) {
      exceeded = limitation.flagFunction(value);
    }
    return exceeded;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlagged, featureId, config, state]);

  return {
    isFlagged,
    isFlagReached,
  };
}

export default useSchemeCheck;
