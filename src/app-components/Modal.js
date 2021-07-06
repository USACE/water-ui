import React, { useEffect, useState } from "react";
import { connect } from "redux-bundler-react";
import Transition from "../utils/Transition";

// Markup for modal sourced from free
// Tailwind UI Preview Components
// https://tailwindui.com/preview

export default connect(
  "selectModalContent",
  "selectModalProps",
  "doModalClose",
  ({ modalContent: ModalContent, modalProps }) => {
    const [show, setShow] = useState(false);

    // Trigger Transition to show modal
    useEffect(() => {
      // Reset to false if previously set true
      if (!ModalContent) {
        setShow(false);
        return;
      }
      setShow(true);
    }, [ModalContent]);

    return (
      <>
        {/* Gray Semi-Transparent Overlay */}
        {/* Modal backdrop */}
        <Transition
          className='fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transition-opacity'
          show={show}
          enter='transition ease-out duration-200'
          enterStart='opacity-0'
          enterEnd='opacity-100'
          leave='transition ease-out duration-100'
          leaveStart='opacity-100'
          leaveEnd='opacity-0'
          aria-hidden='true'
        />
        <Transition
          className='fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6 w-200'
          role='dialog'
          aria-modal='true'
          show={show}
          enter='transition ease-in-out duration-200'
          enterStart='opacity-0 translate-y-4'
          enterEnd='opacity-100 translate-y-0'
          leave='transition ease-in-out duration-200'
          leaveStart='opacity-100 translate-y-0'
          leaveEnd='opacity-0 translate-y-4'
        >
          {ModalContent && <ModalContent {...modalProps} />}
        </Transition>
      </>
    );
  }
);
