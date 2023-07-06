import React, { useEffect, useRef, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import maplibregl from 'maplibre-gl';
import BasemapControl from './maplibre-basemap-switcher';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'maplibre-gl-basemaps/lib/basemaps.css';
import clusterLayer from './layers';

const apiUrl = import.meta.env.VITE_WATER_API_URL;

export default function Map({ controls, children, mapRef }) {
  const {
    doMapLocationSelectionUpdate,
    doUpdateUrl,
    providerByRoute: provider,
    providerLocationByRoute: location,
    mapLocationSelected,
  } = useConnect(
    'doMapLocationSelectionUpdate',
    'doUpdateUrl',
    'selectProviderByRoute',
    'selectProviderLocationByRoute',
    'selectMapLocationSelected'
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
        center: [-86, 39],
        zoom: 4,
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
      map.addControl(new BasemapControl({ apiKey: '' }), 'bottom-left');
    }
    setMap(map);

    clusterLayer(
      map,
      'locations',
      `${apiUrl}/providers/${provider?.slug}/locations?fmt=geojson`,
      doUpdateUrl
    );

    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'unclustered-point', function (e) {
      // map.flyTo({
      //   center: e.features[0].geometry.coordinates,
      // });
      const _provider = e.features[0].properties.provider;
      const slug = e.features[0].properties.slug;
      const geometry = e.features[0].properties.geometry;

      doMapLocationSelectionUpdate(_provider, slug, geometry);
      doUpdateUrl(`/map/${_provider}/locations/${slug}`);
    });

    // mapLocationSelected?.geometry?.coordinates?.length &&
    //   map.flyTo({
    //     center: mapLocationSelected?.geometry?.coordinates,
    //   });
    // console.log('----------');
    // console.log(mapLocationSelected?.geometry?.coordinates);
    // console.log('----------');

    // map.on('click', 'unclustered-point', function (e) {
    //   console.log('yo dawg');
    //   console.log(e.features[0].geometry.coordinates);
    //   map.flyTo({
    //     center: e.features[0].geometry.coordinates,
    //   });
    // });

    //  // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    //  map.on('click', 'locations', function (e) {
    //   map.flyTo({
    //     center: e.features[0].geometry.coordinates,
    //   });
    // });

    // // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    // map.on('mouseenter', 'locations', function () {
    //   map.getCanvas().style.cursor = 'pointer';
    // });

    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'locations', function () {
    //   map.getCanvas().style.cursor = '';
    // });

    // // When a click event occurs on a feature in the places layer, open a popup at the
    // // location of the feature, with description HTML from its properties.
    // map.on('click', 'locations', (e) => {
    //   // Copy coordinates array.
    //   const coordinates = e.features[0].geometry.coordinates.slice();
    //   const description = e.features[0].properties.public_name;
    //   const provider = e.features[0].properties.provider;
    //   const slug = e.features[0].properties.slug;

    //   // Ensure that if the map is zoomed out such that multiple
    //   // copies of the feature are visible, the popup appears
    //   // over the copy being pointed to.
    //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //   }
    //   console.log(coordinates);

    //   doMapLocationSelectionUpdate(provider, slug);

    //   doUpdateUrl(`/map/${provider}/locations/${slug}`);

    //   // new maplibregl.Popup()
    //   //   .setLngLat(coordinates)
    //   //   .setHTML(description)
    //   //   .addTo(map);
    // });

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
    provider,
  ]);

  // set the map location selection if coming in from url
  useEffect(() => {
    doMapLocationSelectionUpdate(
      location?.provider,
      location?.slug,
      location?.geometry
    );
  }, [location, doMapLocationSelectionUpdate]);

  useEffect(() => {
    // const map = map.current;

    if (!mapLocationSelected.geometry || !map) {
      return;
    }

    mapLocationSelected?.geometry?.coordinates?.length &&
      map.flyTo({
        center: mapLocationSelected?.geometry?.coordinates,
        zoom: 8,
        bearing: 0,
        essential: true,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.9, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
          return t;
        },
      });
    //setMap(map);
    // console.log('----------');
    // console.log(mapLocationSelected?.geometry?.coordinates);
    // console.log('----------');
  }, [mapLocationSelected, map]);

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
