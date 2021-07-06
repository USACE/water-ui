import createRestBundle from "./create-rest-bundle";

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default createRestBundle({
  name: "locationDetail",
  uid: "slug",
  prefetch: true,
  staleAfter: 0, //5min
  persist: false,
  routeParam: "slug",
  getTemplate: `${apiUrl}/locations/:slug`,
  putTemplate: "",
  postTemplate: "",
  deleteTemplate: "",
  fetchActions: ["URL_UPDATED"],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: "name",
  sortAsc: true,
  mergeItems: false,
  addons: {},
});
