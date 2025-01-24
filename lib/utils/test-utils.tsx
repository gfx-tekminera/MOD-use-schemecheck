import React from 'react'
import type { PropsWithChildren } from 'react';
import { render, renderHook } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { SchemeCheckProvider } from '../Provider';
import type { SchemeCheckConfig } from '../context';

export const test0Slice = createSlice({
  name: 'test0',
  initialState: {
    value1: undefined,
  } as { value1?: string },
  reducers: {
    changetest0: state => {
      state.value1 = 'lele';
    },
  },
});
export const test1Slice = createSlice({
  name: 'test1',
  initialState: {
    value1: 'stringVal',
    value2: true,
    value3: 111,
  },
  reducers: {
    changetest1: state => {
      state.value1 = 'change1';
      state.value2 = false;
      state.value3 = 222;
      return state;
    },
  },
});
export const test2Slice = createSlice({
  name: 'test2',
  initialState: {
    value1: ['le', 'ye', 'we'],
    value2: [true, false],
    value3: [1, 2, 3],
  },
  reducers: {
    changetest2: state => {
      state.value1 = ['le', 'ye'];
      state.value2 = [true];
      state.value3 = [2, 3];
    },
  },
});
// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

const rootReducer = combineReducers({
  test0: test0Slice.reducer,
  test1: test1Slice.reducer,
  test2: test2Slice.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>

const testConfig: SchemeCheckConfig<RootState> = {
  'test0Value1': {
    stateKey: 'test0.value1',
    flag: {
      type: 'toggle',
    },
  },
  'test0Value1f': {
    stateSelector: state => {
      return state.test0.value1;
    },
    flagFunction: val => {
      return val !== undefined;
    },
  },
  'test1Value1': {
    stateKey: 'test1.value1',
    flag: {
      type: 'value',
      value: 'stringVal',
    },
  },
  'test1Value1f': {
    stateSelector: state => {
      return state.test1.value1;
    },
    flagFunction: val => {
      // @ts-expect-error type RootState and string has no overlap
      return val === 'stringVal';
    },
  },
  'test1Value2': {
    stateKey: 'test1.value2',
    flag: {
      type: 'value',
      value: true,
    },
  },
  'test1Value2f': {
    stateSelector: state => {
      return state.test1.value2;
    },
    flagFunction: val => {
      // @ts-expect-error type RootState and boolean has no overlap
      return val === true;
    },
  },
  'test1Value3': {
    stateKey: 'test1.value3',
    flag: {
      type: 'value',
      value: 111,
    },
  },
  'test1Value3f': {
    stateSelector: state => {
      return state.test1.value3;
    },
    flagFunction: val => {
      // @ts-expect-error type RootState and number has no overlap
      return val === 111;
    },
  },
  'test2Value1': {
    stateKey: 'test2.value1',
    flag: {
      type: 'max',
      count: 2,
    },
  },
  'test2Value1f': {
    stateSelector: state => {
      return state.test2.value1;
    },
    flagFunction: val => {
      try {
        // @ts-expect-error conversion RootState to string[]
        return (val as string[])?.length > 2;
      } catch {
        return false;
      }
    },
  },
  'test2Value2': {
    stateKey: 'test2.value2',
    flag: {
      type: 'max',
      count: 1,
    },
  },
  'test2Value2f': {
    stateSelector: state => {
      return state.test2.value2;
    },
    flagFunction: val => {
      try {
        // @ts-expect-error conversion RootState to array
        return (val as boolean[])?.length > 1;
      } catch {
        return false;
      }
    },
  },
  'test2Value3': {
    stateKey: 'test2.value3',
    flag: {
      type: 'max',
      count: 2,
    },
  },
  'test2Value3f': {
    stateSelector: state => {
      return state.test2.value3;
    },
    flagFunction: val => {
      try {
        // @ts-expect-error conversion RootState to array
        return (val as boolean[])?.length > 2;
      } catch {
        return false;
      }
    },
  },
};

export function renderWithProviders(
  ui?: React.ReactNode,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <SchemeCheckProvider config={testConfig as SchemeCheckConfig}>
        {children}
      </SchemeCheckProvider>
    </Provider>
  )

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

export function renderHookWithProviders<Result, Props>(
  render: (initialProps: Props) => Result,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <SchemeCheckProvider config={testConfig as SchemeCheckConfig}>
        {children}
      </SchemeCheckProvider>
    </Provider>
  )

  return { store, ...renderHook(render, { wrapper: Wrapper, ...renderOptions }) }
}
