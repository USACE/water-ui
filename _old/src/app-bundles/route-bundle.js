import { createRouteBundle } from 'redux-bundler';

import Home from '../app-pages/home.js';
import fourOhFour from '../app-pages/404.js';
import LocationDetail from '../app-pages/location/location-detail';
import ProviderHome from '../app-pages/provider/provider-home.js';
import ProviderList from '../app-pages/provider/provider-list.js';
import WatershedHome from '../app-pages/watershed/watershed-home.js';
import WatershedDetail from '../app-pages/watershed/watershed-detail.js';
import MapHome from '../app-pages/map-home';
import ProviderLocationList from '../app-pages/provider/provider-location-list.js';
import ProviderQA from '../app-pages/provider/provider-qa.js';

export default createRouteBundle({
  '/': Home,
  '/map/:provider_slug/locations/:location_slug': MapHome,
  '/map': MapHome,
  '/overview': ProviderList,
  '/overview/:provider_slug': ProviderHome,
  '/overview/:provider_slug/watershed/:watershed_slug': WatershedDetail,
  '/overview/:provider_slug/watershed': WatershedHome,
  '/overview/:provider_slug/locations/:location_slug': LocationDetail,
  '/overview/:provider_slug/locations': ProviderLocationList,
  '/overview/:provider_slug/qa': ProviderQA,
  '*': fourOhFour,
});