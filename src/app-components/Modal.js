/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { connect } from 'redux-bundler-react';

// Markup for modal sourced from free
// Tailwind UI Preview Components
// https://tailwindui.com/preview

// export default connect(
//   "selectModalContent",
//   "selectModalProps",
//   "doModalClose",
//   ({ modalContent: ModalContent, modalProps }) => {
//     return (
//       <>
//         {/* Gray Semi-Transparent Overlay */}
//         {/* Modal backdrop */}

//         {ModalContent && <ModalContent {...modalProps} />}
//       </>
//     );
//   }
// );

const Modal = connect(
  'selectModalContent',
  'selectModalProps',
  'doModalClose',
  ({ modalContent: ModalContent, modalProps, doModalClose }) => {
    return ModalContent ? (
      <Transition.Root show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => doModalClose()}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="   ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* =========================== */}
            {/* VARIABLE MODAL CONTENT HERE */}
            <ModalContent />
            {/* =========================== */}
          </div>
        </Dialog>
      </Transition.Root>
    ) : null;
  }
);

export { Modal, Modal as default };
