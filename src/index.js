import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "redux-bundler-react";
import { getNavHelper } from "internal-nav-helper";
import getStore from "./app-bundles";

import App from "./App";
import cache from "./cache";

cache.getAll().then((initialData) => {
  const store = getStore(initialData);

  if (process.env.NODE_ENV === "development") window.store = store;

  ReactDOM.render(
    <Provider store={store}>
      <div
        onClick={getNavHelper((url) =>
          store.doUpdateUrl(url, { maintainScrollPosition: true })
        )}
      >
        <App />
      </div>
    </Provider>,
    document.getElementById("root")
  );
});
