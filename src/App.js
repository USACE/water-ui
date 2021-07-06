import React, { useRef } from "react";
import { connect } from "redux-bundler-react";
import Modal from "./app-components/Modal";
import { SearchModal } from "./app-components/Search";

import "./css/style.scss";

const App = connect("selectRoute", "selectPathname", ({ route: Route }) => {
  // OuterRef used to detect clickOutside in child components
  const doc = useRef(null);

  return (
    <div ref={doc}>
      <Route />
      <Modal />
      <SearchModal outerRef={doc} />
    </div>
  );
});

export default App;
