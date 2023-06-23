import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';

import { getNavHelper } from 'internal-nav-helper';
import getStore from './app-bundles';

import cache from './cache';
import { ReduxBundlerProvider } from 'redux-bundler-hook';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

cache.getAll().then((initialData) => {
  const store = getStore(initialData);

  if (process.env.NODE_ENV === 'development') window.store = store;

  root.render(
    <ReduxBundlerProvider store={store}>
      <HelmetProvider>
        <div
          role="presentation"
          className="dark:bg-gray-800"
          onClick={getNavHelper(store.doUpdateUrl)}
        >
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </div>
      </HelmetProvider>
    </ReduxBundlerProvider>
  );
});
