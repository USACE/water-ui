import { createRouteBundle } from 'redux-bundler';

import Home from '../app-pages/home.jsx';
import fourOhFour from '../app-pages/404.jsx';
import LocationDetail from '../app-pages/location/location-detail';
import ProviderHome from '../app-pages/provider/provider-home.jsx';
import ProviderList from '../app-pages/provider/provider-list.jsx';
import WatershedHome from '../app-pages/watershed/watershed-home.jsx';
import WatershedDetail from '../app-pages/watershed/watershed-detail.jsx';
import MapHome from '../app-pages/map-home';
import ProviderLocationList from '../app-pages/provider/provider-location-list.jsx';
import ProviderQA from '../app-pages/provider/provider-qa.jsx';
import Help from '../app-pages/help.jsx';

export default createRouteBundle({
  '/': Home,
  '/map/:provider_slug/locations/:location_slug': MapHome,
  '/map/:provider_slug/locations': MapHome,
  '/map/:provider_slug': MapHome,
  '/map': MapHome,
  '/overview': ProviderList,
  '/overview/:provider_slug': ProviderHome,
  '/overview/:provider_slug/watershed/:watershed_slug': WatershedDetail,
  '/overview/:provider_slug/watershed': WatershedHome,
  '/overview/:provider_slug/locations/:location_slug': LocationDetail,
  '/overview/:provider_slug/locations': ProviderLocationList,
  '/overview/:provider_slug/qa': ProviderQA,
  '/help': Help,
  '*': fourOhFour,
});
