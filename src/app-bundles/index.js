import {
  composeBundles,
  createCacheBundle,
  createUrlBundle,
} from "redux-bundler";

import createAuthBundle from "./create-auth-bundle";
import createJwtApiBundle from "./create-jwt-api-bundle";

import routeBundle from "./route-bundle";

import cache from "../cache";
import locationBundle from "./location-bundle";
import locationByStateBundle from "./location-state-bundle";
import locationDetailBundle from "./location-detail-bundle";
import mapsBundle from "./maps-bundle";
import modalBundle from "./modal-bundle";
import modalMapBundle from "./modal-map-bundle";
import searchBundle from "./search-bundle";
import officeBundle from "./office-bundle";
import officeStatsBundle from "./office-stats-bundle";
import profileBundle from "./profile-bundle";
import stateBundle from "./state-bundle";
import stateStatsBundle from "./state-stats-bundle";
import watershedBundle from "./watershed-bundle";

// Include Token With GET Request on These Routes
const includeTokenRoutes = {
  "/downloads": true,
};

// const mockTokenExistingAdmin =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6IlVzZXIuQWRtaW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjAwMDAwMDAwMCwicm9sZXMiOlsiUFVCTElDLlVTRVIiXX0.4VAMamtH92GiIb5CpGKpP6LKwU6IjIfw5wS4qc8O8VM';

const mockTokenPublicUser = null;

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle,
  locationBundle,
  locationByStateBundle,
  locationDetailBundle,
  mapsBundle,
  modalBundle,
  modalMapBundle,
  officeBundle,
  officeStatsBundle,
  profileBundle,
  routeBundle,
  searchBundle,
  stateBundle,
  stateStatsBundle,
  createAuthBundle({
    appId: "20a4794c-91c3-4080-a42c-d9c0bda332a4",
    redirectOnLogout: "/",
    mock: process.env.NODE_ENV === "development" ? true : false,
    token: process.env.NODE_ENV === "development" ? mockTokenPublicUser : null,
  }),
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
  watershedBundle
);
