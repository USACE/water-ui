const searchBundle = {
  name: "search",
  getReducer: () => {
    const initialData = {
      _isOpen: false,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "SEARCH_OPEN":
        case "SEARCH_CLOSE":
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },
  doSearchOpen:
    () =>
    ({ dispatch }) => {
      dispatch({
        type: "SEARCH_OPEN",
        payload: {
          _isOpen: true,
        },
      });
    },
  doSearchClose:
    () =>
    ({ dispatch }) => {
      dispatch({
        type: "SEARCH_CLOSE",
        payload: {
          _isOpen: false,
        },
      });
    },
  selectSearchContent: (state) => state.search.content,
  selectSearchIsOpen: (state) => state.search._isOpen,
};

export default searchBundle;
