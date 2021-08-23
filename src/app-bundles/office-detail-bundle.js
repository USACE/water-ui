import { createSelector } from "redux-bundler";
import createRestBundle from "./create-rest-bundle";

const apiUrl = process.env.REACT_APP_SHARED_API_URL;

export default createRestBundle({
  name: "officeDetail",
  uid: "symbol",
  prefetch: true,
  staleAfter: 0, //milliseconds; 1Hour
  persist: false,
  routeParam: "officeSymbol",
  getTemplate: `${apiUrl}/offices`,
  putTemplate: "",
  postTemplate: "",
  deleteTemplate: "",
  fetchActions: [],
  urlParamSelectors: [],
  forceFetchActions: [],
  sortBy: "symbol",
  sortAsc: true,
  addons: {
    selectOfficeDetailSelected: createSelector(
      "selectOfficeDetailItemsObject",
      "selectSelectedKeys",
      (obj, keys) => {
        if (keys.provider !== "office" || !obj[keys.uid]) {
          return null;
        }
        return obj[keys.uid];
      }
    ),
  },
});
