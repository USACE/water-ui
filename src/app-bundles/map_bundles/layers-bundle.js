/* eslint-disable no-mixed-operators */
const layersBundle = {
  name: "layers",

  reducer: (state = {}, { type, payload }) => {
    switch (type) {
      case "LAYER_UPDATED":
        return { ...state, ...payload };
      default:
        return state;
    }
  },
  selectLayersRaw: (state) => state.layers,
  selectLayersItems: (state) => Object.values(state.layers),
};

export default layersBundle;
