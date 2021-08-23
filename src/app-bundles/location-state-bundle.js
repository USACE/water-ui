import createRestBundle from "./create-rest-bundle";

// Supports fetching of single State (Alabama, Alaska, etc...) of locations at a time

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "locationByState",
  uid: "slug",
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: "",
  getTemplate: `${apiUrl}/locations?state_id=:stateId`,
  putTemplate: ":none/",
  postTemplate: ":none/",
  deleteTemplate: ":none/",
  fetchActions: ["STATE_FETCH_FINISHED", "URL_UPDATED"],
  urlParamSelectors: ["selectStateIdByRoute"],
  forceFetchActions: [],
  sortBy: "name",
  sortAsc: true,
  mergeItems: false,
  addons: {},
});
