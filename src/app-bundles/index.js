import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from "redux-bundler";

import createAuthBundle from "./create-keycloak-auth-bundle";
import createJwtApiBundle from "./create-jwt-api-bundle";

import routeBundle from "./route-bundle";

import cache from "../cache";
import locationBundle from "./location-bundle";
import locationLayerBundle from "./location-layer-bundle";
// import locationByStateBundle from "./location-state-bundle";
import locationDetailBundle from "./location-detail-bundle";
import mapDetailPanelBundle from "./map-detail-panel-bundle";
import modalBundle from "./modal-bundle";
import modalMapBundle from "./modal-map-bundle";
import officeBundle from "./office-bundle";
import officeDetailBundle from "./office-detail-bundle";
import officeStatsBundle from "./office-stats-bundle";
import profileBundle from "./profile-bundle";
import selectedBundle from "./selected-bundle";
import settingsBundle from "./settings-bundle";
import stateBundle from "./state-bundle";
import stateStatsBundle from "./state-stats-bundle";
import watershedBundle from "./watershed-bundle";

// Search Bundles
import createSearchBundle from "./create-search-bundle";
import geocoderSearchBundle from "./geocoder-search-bundle";
import locationSearchBundle from "./location-search-bundle";
import officeSearchBundle from "./office-search-bundle";
import watershedSearchBundle from "./watershed-search-bundle";

// Mapping Bundles
import mapsBundle from "./map_bundles/maps-bundle";
import layersBundle from "./map_bundles/layers-bundle";
import createProjectionBundle from "./map_bundles/create-projection-bundle";
import watershedDetail from "./watershed-detail";

// Include Token With GET Request on These Routes
const includeTokenRoutes = {
  "/downloads": true,
};

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle,
  locationBundle,
  locationLayerBundle,
  // locationByStateBundle,
  locationDetailBundle,
  mapDetailPanelBundle,
  modalBundle,
  modalMapBundle,
  officeBundle,
  officeDetailBundle,
  officeStatsBundle,
  profileBundle,
  routeBundle,
  selectedBundle,
  settingsBundle,

  ///////////////////////////////////////////////////
  // Maps Bundles
  ///////////////////////////////////////////////////
  mapsBundle,
  layersBundle,
  createProjectionBundle(),

  ///////////////////////////////////////////////////
  // Unified Search Bundles
  ///////////////////////////////////////////////////
  createSearchBundle({
    name: "search",
    searchableBundles: [
      officeSearchBundle,
      locationSearchBundle,
      watershedSearchBundle,
      geocoderSearchBundle,
    ],
  }),
  stateBundle,
  stateStatsBundle,
  createAuthBundle(),
  createJwtApiBundle({
    root: process.env.REACT_APP_WATER_API_URL,
    unless: {
      // GET requests do not include token unless path starts with /my_
      // Need token to figure out who "me" is
      custom: ({ method, path }) => {
        if (method === "GET") {
          // Include Token on Any Routes that start with /my_
          // or are explicitly whitelisted in the object
          if (
            path.slice(0, 4) === "/my_" ||
            includeTokenRoutes.hasOwnProperty(path)
          ) {
            return false;
          }
          return true;
        }
        return false;
      },
    },
  }),
  watershedBundle,
  watershedDetail
);
