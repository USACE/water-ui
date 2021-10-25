import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from 'redux-bundler';

import createAuthBundle from './create-keycloak-auth-bundle';
import createJwtApiBundle from './create-jwt-api-bundle';

import routeBundle from './route-bundle';

import cache from '../cache';

// App Bundles
import detailPanelBundle from './detail-panel-bundle';
import modalBundle from './modal-bundle';
import screensizeBundle from './screensize-bundle';
import panelgroupBundle from './panelgroup-bundle';

import selectedBundle from './selected-bundle';
import settingsBundle from './settings-bundle';

import stateBundle from './state-bundle';
import stateStatsBundle from './state-stats-bundle';

// Search Bundles
import createSearchBundle from './create-search-bundle';

// Mapping Bundles
import basemapBundle from './map_bundles/basemap-bundle';
import mapsBundle from './map_bundles/maps-bundle';
import mapsPositionBundle from './map_bundles/maps-position-bundle';
import layersBundle from './map_bundles/layers-bundle';
import createProjectionBundle from './map_bundles/create-projection-bundle';

// Settings Bundles
import basemapSettingsBundle from './basemap-settings-bundle';
import layerSettingsBundle from './layer-settings-bundle';

/////////////////
// Plugin Bundles
/////////////////

// Geocoder
import geocoderSearchBundle from '../app-plugins/geocoder/searchable-bundle';

// Projects
import projectSearchBundle from '../app-plugins/project/searchable-bundle';
import projectItemsBundle from '../app-plugins/project/items-bundle';
import projectDetailBundle from '../app-plugins/project/detail-bundle';
import projectLayerBundle from '../app-plugins/project/layer-bundle';

// Offices
import officeSearchBundle from '../app-plugins/office/searchable-bundle';
import officeBundle from '../app-plugins/office/items-bundle';
import officeDetailBundle from '../app-plugins/office/detail-bundle';
import officeStatsBundle from './office-stats-bundle';

// Watersheds
import watershedSearchBundle from '../app-plugins/watershed/searchable-bundle';
import watershedBundle from '../app-plugins/watershed/watershed-bundle';
import watershedDetail from '../app-plugins/watershed/watershed-detail';

// USGS Sites
import usgsSiteSearchBundle from '../app-plugins/usgs-site/searchable-bundle';
import usgsSiteItemsBundle from '../app-plugins/usgs-site/items-bundle';
import usgsSiteDetailBundle from '../app-plugins/usgs-site/detail-bundle';
import usgsSiteLayerBundle from '../app-plugins/usgs-site/layer-bundle';

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle,
  // Application Bundles
  detailPanelBundle,
  modalBundle,
  panelgroupBundle,
  routeBundle,
  selectedBundle,
  screensizeBundle,
  settingsBundle,
  createAuthBundle({
    name: 'auth',
    host: process.env.REACT_APP_AUTH_HOST,
    realm: 'water',
    client: 'a2w',
    redirectUrl: process.env.REACT_APP_AUTH_REDIRECT_URL,
    refreshInterval: 120,
    sessionEndWarning: 600,
  }),
  createJwtApiBundle({
    skipTokenConfig: {
      custom: ({ method, url }) => {
        // Skip including JWT Bearer Token on all GET requests UNLESS URL pathaname starts with /my_
        if (method === 'GET') {
          const urlObj = new URL(url);
          if (urlObj.pathname && urlObj.pathname.slice(0, 4) === '/my_') {
            return false;
          }
          return true;
        }
        // Include JWT Bearer Token on all other requests
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
  mapsPositionBundle,
  createProjectionBundle(),
  // ###################
  // Application; Search
  // ###################
  createSearchBundle({
    name: 'search',
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
  usgsSiteItemsBundle,
  usgsSiteDetailBundle,
  usgsSiteLayerBundle,
  // Watersheds
  watershedBundle,
  watershedDetail,
  // ################
  // Settings Bundles
  // ################
  basemapSettingsBundle,
  layerSettingsBundle,
  stateBundle,
  stateStatsBundle
);
