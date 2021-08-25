import React from "react";
import ReactDOM from "react-dom";
import { connect } from "redux-bundler-react";

import { Provider } from "redux-bundler-react";
import { getNavHelper } from "internal-nav-helper";
import getStore from "./app-bundles";

import cache from "./cache";
import "./index.css";

// Application Components
import Modal from "./app-components/Modal";

const App = connect(
  "selectRoute",
  "doUpdateUrl",
  ({ route: Route, doUpdateUrl }) => {
    return (
      <div onClick={getNavHelper((url) => doUpdateUrl(url))}>
        <Route />
        <Modal />
      </div>
    );
  }
);

cache.getAll().then((initialData) => {
  const store = getStore(initialData);

  if (process.env.NODE_ENV === "development") window.store = store;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
