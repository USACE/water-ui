import { useConnect } from 'redux-bundler-hook';

export default function Modal() {
  const { modalContent: ModalContent, modalProps } = useConnect(
    'selectModalContent',
    'selectModalProps',
    'selectModalOnClose',
    'doModalClose'
  );

  return ModalContent ? (
    <dialog id='modal' open>
      {ModalContent && <ModalContent {...modalProps} />}
    </dialog>
  ) : null;
}
