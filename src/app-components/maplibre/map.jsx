import React, { useEffect, useRef, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import maplibregl from 'maplibre-gl';
import BasemapControl from './maplibre-basemap-switcher';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'maplibre-gl-basemaps/lib/basemaps.css';

const apiUrl = process.env.REACT_APP_WATER_API_URL;

export default function Map({ controls, children, mapRef }) {
  const { doMapLocationSelectionUpdate, doUpdateUrl } = useConnect(
    'doMapLocationSelectionUpdate',
    'doUpdateUrl'
  );

  const mapEl = useRef();
  const [map, setMap] = useState();
  useEffect(() => {
    if (!mapEl.current) return;

    const map = new maplibregl.Map(
      {
        attributionControl: false,
        container: mapEl.current,
        style:
          'https://api.maptiler.com/maps/voyager/style.json?key=UYMc0uOxdLvOXIuWttnQ',
        center: [-96, 39],
        zoom: 5,
      },
      [mapEl.current]
    );

    if (controls.navigation) {
      const nav = new maplibregl.NavigationControl();
      map.addControl(nav, 'top-left');
    }

    if (controls.geolocation) {
      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
    }

    if (controls.scale) {
      const scale = new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial',
      });
      map.addControl(scale);
    }

    if (controls.fullscreen) {
      map.addControl(new maplibregl.FullscreenControl());
    }

    map.addControl(
      new maplibregl.AttributionControl({
        compact: true,
      })
    );

    if (controls.basemaps) {
      map.addControl(new BasemapControl({ apiKey: '' }), 'bottom-right');
    }
    setMap(map);

    map.on('load', () => {
      map.addSource('location_points', {
        type: 'geojson',
        // data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson',
        data: `${apiUrl}/providers/lrh/locations?fmt=geojson`,
      });
      map.loadImage(
        'https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/location-512.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('location_icon', image);
        }
      );
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        source: 'location_points',
        // interactive: true,
        layout: {
          'icon-image': 'location_icon',
          'icon-size': 0.07,
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          // get the name from the source's "name" property
          'text-field': ['get', 'public_name'],
          'text-offset': [0, 1.25],
          'text-anchor': 'top',
        },
      });
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'locations', (e) => {
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.public_name;
      const provider = e.features[0].properties.provider;
      const slug = e.features[0].properties.slug;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      console.log(coordinates);

      doMapLocationSelectionUpdate(provider, slug);

      doUpdateUrl(`/map/${provider}/location/${slug}`);

      new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    if (mapRef) {
      mapRef.current = map;
    }
  }, [
    controls.navigation,
    controls.geolocation,
    controls.scale,
    controls.fullscreen,
    controls.basemaps,
    mapRef,
    doMapLocationSelectionUpdate,
    doUpdateUrl,
  ]);

  let elements = React.Children.toArray(children);
  elements = elements.map((el) => {
    return React.cloneElement(el, { map: map });
  });
  return (
    <div
      ref={mapEl}
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
    >
      {elements}
    </div>
  );
}
