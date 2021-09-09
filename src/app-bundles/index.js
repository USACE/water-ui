import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from "redux-bundler";

import createAuthBundle from "./create-keycloak-auth-bundle";
import createJwtApiBundle from "./create-jwt-api-bundle";

import routeBundle from "./route-bundle";

import cache from "../cache";

// App Bundles
import detailPanelBundle from "./detail-panel-bundle";
import modalBundle from "./modal-bundle";
import screensizeBundle from "./screensize-bundle";
import panelgroupBundle from "./panelgroup-bundle";

import profileBundle from "./profile-bundle";
import selectedBundle from "./selected-bundle";
import settingsBundle from "./settings-bundle";

import stateBundle from "./state-bundle";
import stateStatsBundle from "./state-stats-bundle";

// Search Bundles
import createSearchBundle from "./create-search-bundle";

// Mapping Bundles
import basemapBundle from "./map_bundles/basemap-bundle";
import mapsBundle from "./map_bundles/maps-bundle";
import layersBundle from "./map_bundles/layers-bundle";
import createProjectionBundle from "./map_bundles/create-projection-bundle";

// Settings Bundles
import basemapSettingsBundle from "./basemap-settings-bundle";

/////////////////
// Plugin Bundles
/////////////////

// Geocoder
import geocoderSearchBundle from "../app-plugins/geocoder/searchable-bundle";

// Projects
import projectSearchBundle from "../app-plugins/project/searchable-bundle";
import projectItemsBundle from "../app-plugins/project/items-bundle";
import projectDetailBundle from "../app-plugins/project/detail-bundle";
import projectLayerBundle from "../app-plugins/project/layer-bundle";

// Offices
import officeSearchBundle from "../app-plugins/office/searchable-bundle";
import officeBundle from "../app-plugins/office/items-bundle";
import officeDetailBundle from "../app-plugins/office/detail-bundle";
import officeStatsBundle from "./office-stats-bundle";

// Watersheds
import watershedSearchBundle from "../app-plugins/watershed/searchable-bundle";
import watershedBundle from "../app-plugins/watershed/watershed-bundle";
import watershedDetail from "../app-plugins/watershed/watershed-detail";

// USGS Sites
import usgsSiteSearchBundle from "../app-plugins/usgs-site/searchable-bundle";
import usgsSiteDetailBundle from "../app-plugins/usgs-site/detail-bundle";

// Include Token With GET Request on These Routes
const includeTokenRoutes = {
  "/downloads": true,
};

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle,
  // Application Bundles
  detailPanelBundle,
  modalBundle,
  profileBundle,
  panelgroupBundle,
  routeBundle,
  selectedBundle,
  screensizeBundle,
  settingsBundle,
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
  // ####################
  // Application; Mapping
  // ####################
  basemapBundle,
  layersBundle,
  mapsBundle,
  createProjectionBundle(),
  // ###################
  // Application; Search
  // ###################
  createSearchBundle({
    name: "search",
    searchableBundles: [
      officeSearchBundle, // from plugin offices
      projectSearchBundle, // from plugin projects
      usgsSiteSearchBundle, // from plugin usgs-site
      watershedSearchBundle, // from plugin watershed
      geocoderSearchBundle, // from plugin geocoder
    ],
  }),
  // ##############
  // Plugin Bundles
  // ##############
  // Projects
  projectItemsBundle,
  projectLayerBundle,
  projectDetailBundle,
  // Offices
  officeBundle,
  officeDetailBundle,
  officeStatsBundle,
  // USGS Sites
  usgsSiteDetailBundle,
  // Watersheds
  watershedBundle,
  watershedDetail,
  // ################
  // Settings Bundles
  // ################
  basemapSettingsBundle,
  stateBundle,
  stateStatsBundle
);
