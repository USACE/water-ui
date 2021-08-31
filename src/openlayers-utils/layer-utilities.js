import Collection from "ol/Collection";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Circle from "ol/style/Circle";
import XYZ from "ol/source/XYZ";
import TileArcGISRest from "ol/source/TileArcGISRest";
import ImageArcGISRest from "ol/source/ImageArcGISRest";
import ImageWMS from "ol/source/ImageWMS";
import TileWMS from "ol/source/TileWMS";
import VectorSrc from "ol/source/Vector";
import Tile from "ol/layer/Tile";
import Image from "ol/layer/Image";
import Vector from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import vectorStyleCreator from "./vector-style";
import xhr from "xhr";
import EsriJSON from "ol/format/EsriJSON.js";
import { tile, bbox } from "ol/loadingstrategy";
import TileGrid from "ol/tilegrid/TileGrid";
import { createXYZ } from "ol/tilegrid";
import async from "async";
import { createStyleFunctionFromUrl, setMapProjection } from "ol-esri-style";

const esrijsonFormat = new EsriJSON();

const origin = window.location.origin;

const isCrossOrigin = (url) => {
  if (!!window.MSInputMethodContext && !!document.documentMode) return null;
  if (url) {
    if (url.indexOf(origin) === -1) return "anonymous";
  } else {
    return null;
  }
};

function formatLabeledUrl(url) {
  const delim = url.indexOf("?") === -1 ? "?" : "&";
  return `${url}${delim}label=true`;
}

function getXyzSource(options) {
  const labelsOn = !!options.labelDefault;
  const url = labelsOn ? formatLabeledUrl(options.url) : options.url;
  return new XYZ({
    attributions: options.attributions || options.attribution,
    attributionsCollapsible: true,
    maxZoom: options.maxzoom,
    minZoom: options.minzoom,
    url: url,
    crossOrigin: isCrossOrigin(options.url),
  });
}

function getTileLayer(options, source) {
  return new Tile({
    source: source,
    visible: options.visible,
    zIndex: options.zIndex || 0,
    opacity: options.opacity || 1,
    maxZoom: options.maxzoom,
    minZoom: options.minzoom,
  });
}

function getSource(options) {
  switch (options.serviceType) {
    case "XYZ":
      return getXyzSource(options);
    default:
      return null;
  }
}

function getLayer(options, source, map) {
  if (!source) source = getSource(options);
  switch (options.serviceType) {
    case "XYZ":
      return getTileLayer(options, source);
    default:
      return null;
  }
}

export { getSource, getLayer };
