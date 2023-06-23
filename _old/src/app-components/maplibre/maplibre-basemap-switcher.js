// plugin for maplibre-gl to give users a select for changing between basemaps
class BasemapControl {
  constructor(options) {
    options.apiKey = "UYMc0uOxdLvOXIuWttnQ";
    this._options = options;
  }

  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";
    this._container.innerHTML = `
      <select class="maplibregl-ctrl-select">
        <option value="voyager">Streets</option>
        <option value="satellite">Satellite</option>
        <option value="hybrid">Hybrid</option>
        <option value="outdoor">Outdoor</option>
      </select>
    `;
    this._container.querySelector("select").addEventListener("change", (e) => {
      this._map.setStyle(
        `https://api.maptiler.com/maps/${e.target.value}/style.json?key=${this._options.apiKey}`
      );
    });
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export default BasemapControl;
