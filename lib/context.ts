import { createContext } from 'react';

export type StateValue = boolean | string | number | boolean[] | string[] | number[];
// T: rootstate
interface LimitConfig<T> {
  stateKey?: string;
  flag?: {
    type: 'toggle' | 'max' | 'value';
    count?: number;
    value?: StateValue;
  };
  stateSelector?: (state: T) => unknown;
  flagFunction?: (value: T) => boolean;
}
export type SchemeCheckConfig<T = unknown> = Record<string, LimitConfig<T>>;

export interface SchemeCheckContent {
  config: SchemeCheckConfig;
}
export const SchemeCheckContext = createContext<SchemeCheckContent>({
  config: {},
});
