import { createStore, compose } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

import rootReducer from 'store/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const makeConfiguredStore = (reducer) =>
  createStore(reducer, composeEnhancers());

const makeStore: MakeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore(rootReducer);
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'nextjs',
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = makeConfiguredStore(persistedReducer) as any;

    store.__persistor = persistStore(store); // Nasty hack

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
