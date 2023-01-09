import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from 'redux-bundler';

import routeBundle from './route-bundle';
import cache from '../cache';
// import chartBundle from './chart-bundle';
// import chartTypeBundle from './chart-type-bundle.js';
// import chartDetailBundle from './chart-detail-bundle';
// import chartMappingBundle from './chart-mapping-bundle';

// todo; this should be converted to bundle maintained at @usace/modal-bundle
import modalBundle from './modal-bundle';
import createSearchBundle from './create-search-bundle';

// Searchable Bundles
// import locationSearchBundle from './location-search-bundle';
// import timeseriesSearchBundle from './timeseries-search-bundle';

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle,
  createSearchBundle({
    name: 'search',
    // searchableBundles: [locationSearchBundle, timeseriesSearchBundle],
    searchableBundles: [],
  }),
  modalBundle,
  routeBundle
);
