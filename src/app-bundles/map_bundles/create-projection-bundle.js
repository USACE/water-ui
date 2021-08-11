import { get } from "ol/proj";
import proj4 from "proj4";

import { register } from "ol/proj/proj4";
import { createSelector } from "redux-bundler";

const createProjectionBundle = (opts = {}) => {
  const defaultProjections = {
    "EPSG:4326": {
      epsg: "EPSG:4326",
      name: "WGS 84 - WGS84 - World Geodetic System 1984",
      proj: get("EPSG:4326"),
    },
    "EPSG:3857": {
      epsg: "EPSG:3857",
      name: "WGS 84 / Pseudo-Mercator - Spherical Mercator",
      proj: get("EPSG:3857"),
    },
    "EPSG:3413": {
      epsg: "EPSG:3413",
      name: "WGS 84 / NSIDC Sea Ice Polar Stereographic North",
      proj: get("EPSG:3413"),
    },
  };

  // Default Projections (EPSG:4326 and EPSG:3857) Extended with
  // projections provided via createProjectionBundle({ projections: {} })
  const projections = { ...defaultProjections, ...opts["projections"] };

  return {
    name: "projection",
    getReducer: () => {
      const initialData = {
        _error: null,
        _loading: false,
        _epsgio: false,
        _selected: "EPSG:4326",
        ...projections,
      };

      return (state = initialData, { type, payload }) => {
        switch (type) {
          case "PROJECTION_REMOVED":
            return { ...payload };
          case "PROJECTION_PING_RESULT":
          case "PROJECTION_SELECTED":
          case "PROJECTION_LOAD_START":
          case "PROJECTION_LOAD_FINISH":
          case "PROJECTION_LOAD_ERROR":
            return { ...state, ...payload };
          default:
            return state;
        }
      };
    },
    // Action Creators
    doProjectionLoadDef:
      (epsg) =>
      ({ dispatch, anonGet }) => {
        dispatch({
          type: "PROJECTION_LOAD_START",
          payload: { _loading: true },
        });
        const matcher = /PROJCS..(.*)..GEOGCS/g;
        let newcode = epsg;
        if (epsg.indexOf(":") !== -1) newcode = newcode.split(":")[1];
        anonGet(
          `https://epsg.io/${newcode}.proj4`,
          (err, response, projBody) => {
            if (projBody) {
              anonGet(
                `https://epsg.io/${newcode}.wkt`,
                (err, response, nameBody) => {
                  if (nameBody) {
                    const name = matcher.exec(nameBody)[1];

                    proj4.defs(epsg, projBody);
                    register(proj4);

                    dispatch({
                      type: "PROJECTION_LOAD_FINISH",
                      payload: {
                        _loading: false,
                        [epsg]: {
                          epsg: epsg,
                          name: name,
                          proj: get(epsg),
                        },
                      },
                    });
                  }
                }
              );
            } else {
              dispatch({
                type: "PROJECTION_LOAD_ERROR",
                payload: { _loading: false, _error: response },
              });
              return;
            }
          }
        );
      },
    doProjectionPingEPSGIO:
      () =>
      ({ dispatch }) => {
        fetch("https://epsg.io/26916.wkt")
          .then((resp) => {
            if (!resp.ok) {
              throw new Error("Bad Response Status:" + resp.status);
            }
            return resp;
          })
          .then((resp) => {
            if (resp.body) {
              dispatch({
                type: "PROJECTION_PING_RESULT",
                payload: { _epsgio: true },
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      },
    doProjectionRemove:
      (epsg) =>
      ({ dispatch, store }) => {
        const state = Object.assign({}, store.selectProjectionStateRaw());
        delete state[epsg];
        dispatch({ type: "PROJECTION_REMOVED", payload: state });
      },
    doProjectionSelected:
      (epsg) =>
      ({ dispatch, store }) => {
        dispatch({
          type: "PROJECTION_SELECTED",
          payload: { _selected: epsg },
        });
      },
    // selectors
    selectProjectionRaw: (state) => state.projection,
    selectProjectionCanUseEPSGIO: (state) => state.projection._epsgio,
    selectProjectionList: (state) =>
      Object.values(state.projection).filter(
        // val && to exclude null as an object
        (val) => val && typeof val === "object"
      ),
    selectProjectionGeo: (state) => state.projection["EPSG:4326"].proj,
    selectProjectionMap: (state) => state.projection["EPSG:3857"].proj,
    selectProjectionSelected: (state) =>
      state.projection[state.projection._selected],
    selectProjectionSelectedName: createSelector(
      "selectProjectionSelected",
      (selected) => selected.name
    ),

    init: (store) => {
      store.doProjectionPingEPSGIO();
      store.doProjectionLoadDef("EPSG:3413");
    },
  };
};

export default createProjectionBundle;
