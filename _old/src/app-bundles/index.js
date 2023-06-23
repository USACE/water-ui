import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from 'redux-bundler';

import createAuthBundle from '@usace/create-keycloak-auth-bundle';
import createJwtApiBundle from '@usace/create-jwt-api-bundle';

import routeBundle from './route-bundle';
import cache from '../cache';
// import chartBundle from './chart-bundle';
// import chartTypeBundle from './chart-type-bundle.js';
// import chartDetailBundle from './chart-detail-bundle';
// import chartMappingBundle from './chart-mapping-bundle';

// todo; this should be converted to bundle maintained at @usace/modal-bundle
import modalBundle from './modal-bundle';
// todo; this should be converted to bundle maintained at @usace/create-search-bundle
import createSearchBundle from './create-search-bundle';

// Searchable Bundles
import locationSearchBundle from './location-search-bundle';

import providerBundle from './provider-bundle';
// import locationBundle from './location-bundle';
// import mapsBundle from './delete_maps-bundle';
import providerLocationBundle from './provider-location-bundle';
import providerLocationsBundle from './provider-locations-bundle';
import providerTimeseriesValuesBundle from './provider-timeseries-values-bundle';
import providerWatershedBundle from './provider-watershed-bundle';
import providerWatershedsBundle from './provider-watersheds-bundle';
// import watershedBundle from './watershed-bundle';
import timeseriesDateRangeBundle from './timeseries-date-range-bundle';
//import unitBundle from './unit-bundle';
// Searchable Bundles
// import locationSearchBundle from './location-search-bundle';
// import timeseriesSearchBundle from './timeseries-search-bundle';
import providerLocationsFloodBundle from './provider-locations-flood-bundle';
import providerProjectsBundle from './provider-projects-bundles';
import mapLocationBundle from './map-location-bundle';

const mockTokens = {
  ADMIN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJZYVZSTS0xVmp1LWR2N2NEZ0k5ZnJkNVRtZFl1RU5QbWRoV0NaZU1TWmMifQ.eyJleHAiOjE4Mzg1NTU5ODgsImlhdCI6MTYzODU1NTY4OCwianRpIjoiY2YxMWIzMGEtZDg3Zi00OTU2LWEwNjctMTE0OTJjMTZkYjk2IiwiaXNzIjoiaHR0cHM6Ly9kZXZlbG9wLWF1dGguY29ycHMuY2xvdWQvYXV0aC9yZWFsbXMvd2F0ZXIiLCJhdWQiOlsiYTJ3IiwiYWNjb3VudCJdLCJzdWIiOiIzMmUxYjgzMi1hOGVhLTRiOWMtYWIwNC1hNzI0NmNlNzMyMWEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjdW11bHVzIiwic2Vzc2lvbl9zdGF0ZSI6IjVhNTgyZjNlLWIyYWItNDA2OS05N2I1LTIwZWM0NmQ1MmFmZiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy13YXRlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJjdW11bHVzIjp7InJvbGVzIjpbImFwcGxpY2F0aW9uLmFkbWluIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoidG9rZW4ubW9jay5hZG1pbiIsImdpdmVuX25hbWUiOiIiLCJmYW1pbHlfbmFtZSI6IiJ9.fpaIFpqHBnnpBtIe8sOwzSkCEzDbPiHy7FHcI5w1jgI',
  USER: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJZYVZSTS0xVmp1LWR2N2NEZ0k5ZnJkNVRtZFl1RU5QbWRoV0NaZU1TWmMifQ.eyJleHAiOjE4Mzg1NTU5ODgsImlhdCI6MTYzODU1NTY4OCwianRpIjoiY2YxMWIzMGEtZDg3Zi00OTU2LWEwNjctMTE0OTJjMTZkYjk2IiwiaXNzIjoiaHR0cHM6Ly9kZXZlbG9wLWF1dGguY29ycHMuY2xvdWQvYXV0aC9yZWFsbXMvd2F0ZXIiLCJhdWQiOlsiYTJ3IiwiYWNjb3VudCJdLCJzdWIiOiIzMmUxYjgzMi1hOGVhLTRiOWMtYWIwNC1hNzI0NmNlNzMyMWEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjdW11bHVzIiwic2Vzc2lvbl9zdGF0ZSI6IjVhNTgyZjNlLWIyYWItNDA2OS05N2I1LTIwZWM0NmQ1MmFmZiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy13YXRlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJjdW11bHVzIjp7InJvbGVzIjpbXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0b2tlbi5tb2NrLnVzZXIiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIifQ.E5v4rF4xnGVNOkRJPt5HUsIFzYbo7KUJtoiqgR_5XaE',
};
const mockUser = process.env.REACT_APP_AUTH_MOCK_USER
  ? process.env.REACT_APP_AUTH_MOCK_USER.toUpperCase()
  : null;

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle,
  createAuthBundle({
    name: 'auth',
    host: process.env.REACT_APP_AUTH_HOST,
    realm: 'water',
    client: 'a2w',
    redirectUrl: process.env.REACT_APP_AUTH_REDIRECT_URL,
    refreshInterval: 120,
    sessionEndWarning: 600,
    mock:
      process.env.NODE_ENV === 'development' && mockUser && mockTokens[mockUser]
        ? true
        : false,
    mockToken: mockUser ? mockTokens[mockUser] : null,
  }),
  createJwtApiBundle({
    root: process.env.REACT_APP_WATER_API_URL,
    skipTokenConfig: {
      custom: ({ method, url }) => {
        // Skip including JWT Bearer Token on all GET requests
        // unless pathname is included as a key in token_routes
        if (method === 'GET') {
          const urlObj = new URL(url);
          const token_routes = {};
          if (urlObj.pathname && token_routes[urlObj.pathname]) {
            return false;
          }
          return true;
        }
        // Include JWT Bearer Token on all other requests
        return false;
      },
    },
  }),
  createSearchBundle({
    name: 'search',
    // searchableBundles: [locationSearchBundle, timeseriesSearchBundle],
    searchableBundles: [locationSearchBundle],
  }),
  createSearchBundle,
  //locationBundle,
  locationSearchBundle,
  // mapsBundle,
  modalBundle,
  providerBundle,
  providerLocationBundle,
  providerLocationsBundle,
  providerTimeseriesValuesBundle,
  // watershedBundle,
  providerWatershedBundle,
  providerWatershedsBundle,
  routeBundle,
  timeseriesDateRangeBundle,
  providerLocationsFloodBundle,
  providerProjectsBundle,
  mapLocationBundle
  //unitBundle
);
