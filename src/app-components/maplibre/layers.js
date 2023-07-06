// import maplibregl from 'maplibre-gl';
// import { useConnect } from 'redux-bundler-hook';
import LocationIcon from '../../images/map/location-icon1.png';

export default function clusterLayer(map, layerName, sourceData) {
  //const { doUpdateUrl } = useConnect('doUpdateUrl');

  map.on('load', function () {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource(layerName, {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      //   data: 'https://maplibre.org/maplibre-gl-js-docs/assets/earthquakes.geojson',
      data: sourceData,
      cluster: true,
      clusterMaxZoom: 7, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: layerName,
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://maplibre.org/maplibre-style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1',
        ],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
      },
    });

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: layerName,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
    });

    map.loadImage(
      // 'https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/location-512.png',
      // 'https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/map-pin-duotone-512.png',
      LocationIcon,
      function (error, image) {
        if (error) throw error;
        map.addImage('location_icon', image);
      }
    );

    map.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: layerName,
      filter: ['!', ['has', 'point_count']],
      //   paint: {
      //     'circle-color': '#11b4da',
      //     'circle-radius': 6,
      //     'circle-stroke-width': 1,
      //     'circle-stroke-color': '#fff',
      //   },
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

    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      });
      var clusterId = features[0].properties.cluster_id;
      map
        .getSource(layerName)
        .getClusterExpansionZoom(clusterId, function (err, zoom) {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', function (e) {
      const coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //   new maplibregl.Popup()
      //     .setLngLat(coordinates)
      //     .setHTML('magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami)
      //     .addTo(map);
    });

    map.on('mouseenter', 'clusters', function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
      map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'unclustered-point', function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-point', function () {
      map.getCanvas().style.cursor = '';
    });
  });
  //   return map;
  //return;
}
