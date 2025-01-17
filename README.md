# React Redux useSchemeCheck

Check react redux state value in more managed way

## Dependencies

```
react: ^16.8.0
react-redux: *
```

## Instalation

Install with repo url

### npm

```
npm install git+https://github.com/gfx-tekminera/MOD-use-schemecheck.git
```

### yarn

```
yarn add use-schemecheck@https://github.com/gfx-tekminera/MOD-use-schemecheck.git
```

## Usage

### Define store

```ts
const themeSlice = createSlice({
  name: 'theme',
  initialState: { darkMode: false },
  ...
});
const themeReducer = themeSlice.reducer;

const librarySlice = createSlice({
  name: 'theme',
  initialState: { tree: [] },
  ...
});
const libraryReducer = librarySlice.reducer;

const reducers = combineReducers({
  theme: themeReducer,
  library: libraryReducer,
});
const store = configureStore({
  reducers: reducers,
});
```

### Create Config

```ts
export type RootState = ReturnType<typeof store.getState>;
const featureLimitConfig: SchemeCheckConfig<RootState> = {
  // create scheme to flag state value with conditional properties
  darkIsForbidden: {
    stateKey: 'theme.darkMode',
    flag: {
      type: 'value',
      value: true,
    },
  },
  // or create functional scheme for more dynamic implementation
  collectionCount: {
    stateSelector: (state) => {
      const tree = state.library.tree; // state from parameters or define your own value from hooks
      return tree;
    },
    flagFunction: (val: unknown) => {
      try {
        if (val instanceof Array) {
          if (val.length > 3) {
            return true;
          }
        }
        return false;
      } catch {
        return false;
      }
    },
  },
};
```

### Setup provider

Put `SchemeCheckProvider` inside redux provider

```jsx
import { Provider } from 'react-redux';
import { SchemeCheckProvider, SchemeCheckConfig } from 'use-schemecheck';

const App = () => {
  return (
    <Provider store={store}>
      <SchemeCheckProvider config={featureLimitConfig as SchemeCheckConfig}>
        {...the rest of your app}
      </SchemeCheckProvider>
    </Provider>
  );
}
```

### Use scheme checker hooks hooks

```ts,tsx
const Component: React.FC = () => {
  ...
  // isFlagged === true, when featureLimitConfig['collectionCount'] is not undefined
  // isFlagReached === true, when state.library.tree.length > 3
  const { isFlagged, isFlagReached } = useSchemeCheck('collectionCount');
  ...
}
```

## License

MIT
