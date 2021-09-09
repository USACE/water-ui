import createSearchableBundle from "../../app-bundles/create-searchable-bundle";

export default createSearchableBundle({
  searchEntity: "office",
  actionPrefix: "OFFICE",
  doSearch:
    () =>
    ({ dispatch, store }) => {
      dispatch({ type: "OFFICE_SEARCH_START" });
      const q = store.selectSearchQuery().toLowerCase();
      const ff = store.selectOfficeItems();
      // Do not fire request if fewer than 2 characters in search
      if (q.length < 2) {
        dispatch({ type: "OFFICE_SEARCH_FINISH", payload: [] });
        return;
      }
      dispatch({
        type: "OFFICE_SEARCH_FINISH",
        payload: ff.filter(
          (f) =>
            (f.symbol && f.symbol.toLowerCase().includes(q)) ||
            (f.name && f.name.toLowerCase().includes(q))
        ),
      });
    },
});
