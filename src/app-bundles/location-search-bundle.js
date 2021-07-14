import createSearchableBundle from "./create-searchable-bundle";

export default createSearchableBundle({
  searchEntity: "location",
  doSearch:
    () =>
    ({ dispatch, store, apiGet }) => {
      dispatch({ type: "LOCATION_SEARCH_START" });
      // Do not fire request if fewer than 2 characters in search
      const q = store.selectSearchQuery();
      // Do not fire request if fewer than 2 characters in search
      if (q.length < 2) {
        dispatch({ type: "LOCATION_SEARCH_FINISH", payload: [] });
        return;
      }
      apiGet(
        `${
          process.env.REACT_APP_WATER_API_URL
        }/search/locations?kind_id=460ea73b-c65e-4fc8-907a-6e6fd2907a99&q=${encodeURIComponent(
          q
        )}`,
        (err, json) => {
          if (err) {
            dispatch({
              type: "LOCATION_SEARCH_ERROR",
              payload: err,
            });
          } else {
            dispatch({
              type: "LOCATION_SEARCH_FINISH",
              payload: json,
            });
          }
        }
      );
    },
});
