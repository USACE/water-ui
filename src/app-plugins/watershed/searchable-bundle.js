import createSearchableBundle from "../../app-bundles/create-searchable-bundle";

export default createSearchableBundle({
  searchEntity: "watershed",
  doSearch:
    () =>
    ({ dispatch, store }) => {
      dispatch({ type: "WATERSHED_SEARCH_START" });
      const q = store.selectSearchQuery().toLowerCase();
      const ww = store.selectWatershedItems();
      // Do not fire request if fewer than 2 characters in search
      if (q.length < 2) {
        dispatch({ type: "WATERSHED_SEARCH_FINISH", payload: [] });
        return;
      }
      dispatch({
        type: "WATERSHED_SEARCH_FINISH",
        payload: ww.filter((f) => f.name && f.name.toLowerCase().includes(q)),
      });
    },
});
