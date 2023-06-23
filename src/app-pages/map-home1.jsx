import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';

// openlayers
import GeoJSON from 'ol/format/GeoJSON';
//import Feature from 'ol/Feature';

import MapWrapper from '../app-components/map/map';
import '../app-components/map/map.css';

//import MockConusMapBoundaries from '../images/mockup/conus-mockup-with-boundaries.png';

export default function Map() {
  const { locationItems: locations } = useConnect('selectLocationItems');
  // set intial state
  const [features, setFeatures] = useState([]);

  // console.log('------------');
  // console.log(payload_features);

  useEffect(() => {
    // if (!locations.length) {
    //   return;
    // }
    // console.log(locations);
    // const payload_features = locations.filter(
    //   (location) => location.geometry && location.provider === 'lrb'
    // );
    // .locations.map((location) => location);

    var geojsonObject = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3857',
        },
      },
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.90708, 42.73329],
          },
          properties: {
            Name: 'TEST SITE 1',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-75.3, 41.55],
          },
          properties: {
            Name: 'TEST SITE 2',
          },
        },
      ],
    };

    console.log(geojsonObject);

    const wktOptions = {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    };

    //console.log(payload_features);

    const parsedFeatures = new GeoJSON().readFeatures(
      geojsonObject,
      wktOptions
    );

    // // set features into state (which will be passed into OpenLayers
    // //  map component as props)
    setFeatures(parsedFeatures);
  }, [locations]);

  return (
    <div className="mx-auto px-4 lg:max-w-screen-2xl lg:px-0">
      <>{JSON.stringify(features)}</>
      {locations && <MapWrapper features={features} />}
      {/* <img src={MockConusMapBoundaries} alt="Conus mockup map" /> */}
    </div>
  );
}
