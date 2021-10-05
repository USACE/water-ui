/* eslint-disable no-mixed-operators */
const layersBundle = {
  name: "layers",

  reducer: (state = {}, { type, payload }) => {
    switch (type) {
      case "LAYER_UPDATED":
        return { ...state, [payload.id]: payload };
      default:
        return state;
    }
  },
  doLayersSetVisibility:
    (id, isVisible) =>
    ({ dispatch, store }) => {
      store
        .selectMapsActive()
        ["main"].getLayers()
        .getArray()
        .find((a) => a.getProperties().id === id)
        .setVisible(isVisible);
    },
  selectLayersRaw: (state) => state.layers,
  selectLayersItems: (state) => Object.values(state.layers).map((v) => v.layer),
  selectLayersList: (state) => Object.values(state.layers),
};

export default layersBundle;
