import 'styles/antd.less';
import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { wrapper } from 'store';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore();

  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default wrapper.withRedux(WrappedApp);
