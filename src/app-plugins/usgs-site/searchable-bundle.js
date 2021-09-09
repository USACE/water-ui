import createSearchableBundle from "../../app-bundles/create-searchable-bundle";

export default createSearchableBundle({
  searchEntity: "usgsSite",
  actionPrefix: "USGS_SITE",
  doSearch:
    () =>
    ({ dispatch, store, apiGet }) => {
      dispatch({ type: "USGS_SITE_SEARCH_START" });
      // Do not fire request if fewer than 2 characters in search
      const q = store.selectSearchQuery();
      // Do not fire request if fewer than 2 characters in search
      if (q.length < 3) {
        dispatch({ type: "USGS_SITE_SEARCH_FINISH", payload: [] });
        return;
      }
      apiGet(
        `${
          process.env.REACT_APP_WATER_API_URL
        }/search/usgs_sites?q=${encodeURIComponent(q)}`,
        (err, json) => {
          if (err) {
            dispatch({
              type: "USGS_SITE_SEARCH_ERROR",
              payload: err,
            });
          } else {
            dispatch({
              type: "USGS_SITE_SEARCH_FINISH",
              payload: json,
            });
          }
        }
      );
    },
});
