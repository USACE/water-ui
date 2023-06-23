const modalBundle = {
  name: 'modal',
  getReducer: () => {
    const initialData = {
      content: null,
      props: null,
      onClose: null,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case 'MODAL_OPENED':
        case 'MODAL_CLOSED':
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },
  doModalOpen:
    (content, props, onClose) =>
    ({ dispatch }) => {
      dispatch({
        type: 'MODAL_OPENED',
        payload: {
          content: content,
          props: props,
          onClose: onClose,
        },
      });
    },
  doModalClose:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: 'MODAL_CLOSED',
        payload: {
          content: null,
          props: null,
          onClose: null,
        },
      });
    },
  selectModalContent: (state) => state.modal.content,
  selectModalOnClose: (state) => state.modal.onClose,
  selectModalProps: (state) => state.modal.props,
};

export default modalBundle;
