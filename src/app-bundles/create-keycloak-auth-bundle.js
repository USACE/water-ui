import { createSelector } from 'redux-bundler';
import Keycloak from './Keycloak.js';

// See init: method
let keycloak = null;

const getTokenPart = function (token, part) {
  const splitToken = token.split('.');
  return splitToken[part];
};

const authBundle = (options) => {
  const defaults = {
    name: 'auth',
    host: 'http://localhost:8080',
    realm: 'default',
    client: 'default',
    redirectUrl: 'http://localhost:3000',
    refreshInterval: 300,
    sessionEndWarning: 600,
  };

  const config = { ...defaults, ...options };

  // Selectors, Action Creators
  const uCaseName = config.name.charAt(0).toUpperCase() + config.name.slice(1);
  const doUpdate = `do${uCaseName}Update`;
  const doLogin = `do${uCaseName}Login`;
  const doLogout = `do${uCaseName}Logout`;
  const selectIsLoggedIn = `select${uCaseName}IsLoggedIn`;
  const selectToken = `select${uCaseName}Token`;
  const selectTokenHeader = `select${uCaseName}TokenHeader`;
  const selectTokenPayload = `select${uCaseName}TokenPayload`;
  const selectUsername = `select${uCaseName}Username`;
  const selectUserInitials = `select${uCaseName}UserInitials`;

  const selectRoles = `select${uCaseName}Roles`;

  // Actions
  const capsName = config.name.toUpperCase();
  const ACTIONS = {
    UPDATED: `${capsName}_UPDATED`,
    LOGGED_OUT: `${capsName}_LOGGED_OUT`,
  };

  return {
    name: config.name,
    reducer: (state = { token: null }, { type, payload }) => {
      switch (type) {
        case ACTIONS.UPDATED:
        case ACTIONS.LOGGED_OUT:
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

    [selectTokenHeader]: createSelector(selectToken, (token) => {
      if (!token) return {};
      return JSON.parse(window.atob(getTokenPart(token, 0)));
    }),

    [selectTokenPayload]: createSelector(selectToken, (token) => {
      if (!token) return {};
      return JSON.parse(window.atob(getTokenPart(token, 1)));
    }),

    [selectRoles]: createSelector(selectTokenPayload, (payload) => {
      if (!Object.keys(payload).length || !config.client) {
        return [];
      }
      return (
        (payload.resource_access &&
          payload.resource_access[config.client] &&
          payload.resource_access[config.client].roles) ||
        []
      );
    }),
    [selectUsername]: createSelector(selectTokenPayload, (payload) => {
      if (!Object.keys(payload).length) {
        return null;
      }
      return payload.preferred_username;
    }),
    [selectUserInitials]: createSelector(selectUsername, (username) => {
      if (!username) {
        return null;
      }
      const parts = username.split('.');
      return `${parts[1][0]}${parts[0][0]}`.toUpperCase();
    }),
    [selectIsLoggedIn]: createSelector(selectToken, (token) => {
      return token ? true : false;
    }),
    [doLogin]:
      () =>
      ({ dispatch, store }) => {
        keycloak.directGrantX509Authenticate();
      },
    [doLogout]:
      () =>
      ({ dispatch, store }) => {
        dispatch({ type: ACTIONS.LOGGED_OUT, payload: { token: null } });
      },
    init: (store) => {
      keycloak = new Keycloak({
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
          console.error('#################################');
          console.error(err);
          console.error('#################################');
          store[doUpdate](null);
        },
        onSessionEnding: (remainingTime) => {
          console.log(`Remaining Session Time: ${remainingTime}`);
        },
      });
      keycloak.checkForSession();
    },
  };
};

export default authBundle;
