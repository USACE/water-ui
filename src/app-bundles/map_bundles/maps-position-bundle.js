const mapsPositionBundle = {
  name: "mapsPosition",

  reducer: (state = { _shouldSync: false }, { type, payload }) => {
    // @todo; may be another way to architect/abstract bundles so dont need to watch
    // for every .*DETAIL_FETCH_FINISHED action.
    if (type.slice(type.length - 21) === "DETAIL_FETCH_FINISHED") {
      return { ...state, _shouldSync: true };
    } else {
      switch (type) {
        case "URL_UPDATED":
        case "MAPS_INITIALIZED":
          return { ...state, _shouldSync: true };
        case "MAPS_POSITION_SYNC":
        case "MAPS_POSITION_FROM_QUERY_START":
        case "MAPS_POSITION_FROM_QUERY_SKIP":
        case "MAPS_POSITION_FROM_QUERY_FINISH":
        case "MAPS_POSITION_FROM_SELECTED_START":
        case "MAPS_POSITION_FROM_SELECTED_SKIP":
        case "MAPS_POSITION_FROM_SELECTED_FINISH":
          return { ...state, ...payload };

        default:
          return state;
      }
    }
  },
  doMapsPositionFromQuery:
    () =>
    ({ dispatch, store }) => {
      dispatch({ type: "MAPS_POSITION_FROM_QUERY_START" });
      // Values from Query Parameters
      const { x: _qX, y: _qY, zoom: _qZoom } = store.selectQueryObject();
      if (!_qX || !_qY || !_qZoom) {
        dispatch({ type: "MAPS_POSITION_FROM_QUERY_SKIP" });
        return;
      }
      // Values From Map
      const { x = null, y = null, zoom = null } = store.selectMapsXYZoom();
      if (!x || !y || !zoom) {
        dispatch({ type: "MAPS_POSITION_FROM_QUERY_SKIP" });
        return;
      }
      if (
        x !== parseFloat(_qX) ||
        y !== parseFloat(_qY) ||
        zoom !== parseFloat(_qZoom)
      ) {
        store.doMapsPositionGoTo("main", [_qX, _qY], _qZoom);
      }
      dispatch({ type: "MAPS_POSITION_FROM_QUERY_FINISH" });
    },
  doMapsPositionFromSelected:
    () =>
    ({ dispatch, store }) => {
      dispatch({ type: "MAPS_POSITION_FROM_SELECTED_START" });

      const _cz = store.selectSelectedXYZoom();
      if (!_cz) {
        dispatch({ type: "MAPS_POSITION_FROM_SELECTED_SKIP" });
        return;
      }
      const { x: _selectedX, y: _selectedY, zoom: _selectedZoom } = _cz;
      // Values From Map
      const { x = null, y = null, zoom = null } = store.selectMapsXYZoom();
      if (!x || !y || !zoom) {
        dispatch({ type: "MAPS_POSITION_FROM_SELECTED_SKIP" });
        return null;
      }
      if (
        _selectedX &&
        _selectedY &&
        _selectedZoom &&
        (x !== _selectedX || y !== _selectedY || zoom !== _selectedZoom)
      ) {
        store.doMapsPositionGoTo(
          "main",
          [_selectedX, _selectedY],
          _selectedZoom
        );
      }
      dispatch({ type: "MAPS_POSITION_FROM_SELECTED_FINISH" });
    },
  doMapsPositionSync:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "MAPS_POSITION_SYNC",
        payload: { _shouldSync: false },
      });
      const { x, y, zoom } = store.selectQueryObject();
      if (x && y && zoom) {
        // y,y,zoom query parameters are set in the URL
        store.doMapsPositionFromQuery();
      } else {
        // Selected provider, uid is set by route parameters /:provider/:uid
        // Find x,y,zoom from provider, uid details. May need to wait for fetch to finish
        store.doMapsPositionFromSelected();
      }
    },
  doMapsPositionGoTo:
    (mapKey, lonLat, zoom) =>
    ({ store }) => {
      const map = store.selectMapsObject()[mapKey];
      if (map) {
        const view = map.getView();
        const _center = view.getCenter();
        const _zoom = view.getZoom();

        // Set Min Zoom to 6
        let _zoomOutMax = _zoom - 3;
        // If zoomOut from current map zoom is less than
        // zoom of new target, set zoomOut to same as zoomTarget
        if (_zoomOutMax < 4) {
          _zoomOutMax = 4;
        }

        view.animate(
          // Zoom Out at Current Center
          {
            zoom: _zoomOutMax,
            center: _center,
            duration: 600,
          },
          // Pan to New Location at Current Zoom Level
          {
            zoom: _zoomOutMax,
            center: lonLat,
            duration: 1200,
          },
          // Zoom to New Location
          {
            zoom: zoom,
            center: lonLat,
            duration: 600,
          }
        );
      }
    },
  reactMapsPositionShouldSync: (state) =>
    state.mapsPosition._shouldSync
      ? { actionCreator: "doMapsPositionSync" }
      : null,
};

export default mapsPositionBundle;
