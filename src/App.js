import React, { useRef } from "react";
import { connect } from "redux-bundler-react";
import Modal from "./app-components/Modal";
import { Search } from "./app-components/search";

import "./css/style.scss";

const App = connect("selectRoute", "selectPathname", ({ route: Route }) => {
  // OuterRef used to detect clickOutside in child components
  const doc = useRef(null);

  return (
    <div ref={doc}>
      <Route />
      <Modal />
      <Search outerRef={doc} />
    </div>
  );
});

export default App;
