import React from "react";
import { connect } from "redux-bundler-react";

// Markup for modal sourced from free
// Tailwind UI Preview Components
// https://tailwindui.com/preview

export default connect(
  "selectModalContent",
  "selectModalProps",
  "doModalClose",
  ({ modalContent: ModalContent, modalProps }) => {

    return (
      <>
        {/* Gray Semi-Transparent Overlay */}
        {/* Modal backdrop */}
        {ModalContent && <ModalContent {...modalProps} />}
      </>
    );
  }
);
