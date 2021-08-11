import { createSelector } from "redux-bundler";
import Keycloak from "./Keycloak.js";

const authBundle = (options) => {
  const defaults = {
    name: "auth",
    host: "http://localhost:8080",
    realm: "default",
    client: "default",
    redirectUrl: "http://localhost:3000",
    refreshInterval: 300,
    sessionEndWarning: 600,
  };

  const config = { ...defaults, ...options };

  // Selectors, Action Creators
  const uCaseName = config.name.charAt(0).toUpperCase() + config.name.slice(1);
  const doUpdate = `do${uCaseName}Update`;
  const selectToken = `select${uCaseName}Token`;
  const selectRoles = `select${uCaseName}Roles`;

  // Actions
  const capsName = config.name.toUpperCase();
  const ACTIONS = {
    UPDATED: `${capsName}_UPDATED`,
  };

  return {
    name: config.name,
    reducer: (state = { token: null }, { type, payload }) => {
      switch (type) {
        case ACTIONS.UPDATED:
          return { ...state, ...payload };
        default:
          return state;
      }
    },
    [doUpdate]:
      (token) =>
      ({ dispatch, store }) => {
        dispatch({ type: ACTIONS.UPDATED, payload: { token: token } });
      },
    [selectToken]: (state) => state[config.name].token,
    [selectRoles]: createSelector(selectToken, (token) => {
      if (!token) {
        return [];
      }
      // @todo; Pull roles from token information
      return [];
    }),
    init: (store) => {
      const keycloak = new Keycloak({
        keycloakUrl: config.host,
        realm: config.realm,
        client: config.client,
        redirectUrl: config.redirectUrl,
        refreshInterval: config.refreshInterval,
        sessionEndWarning: config.sessionEndWarning,
        onAuthenticate: (token) => {
          store[doUpdate](token);
        },
        onError: (err) => {
          console.log(err);
          store[doUpdate](null);
        },
        onSessionEnding: (remainingTime) => {
          console.log(remainingTime);
        },
      });
      keycloak.checkForSession();
    },
  };
};

export default authBundle;
