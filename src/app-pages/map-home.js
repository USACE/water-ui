import { useState, useEffect } from 'react';

// openlayers
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';

import MapWrapper from '../app-components/map/map';
import '../app-components/map/map.css';

// export function DamProfileChart() {
//   <div>
//     <object
//       type="image/svg+xml"
//       data="https://water-api.corps.cloud/charts/bluestone-dam?format=svg"
//       width="100%"
//     >
//       <img
//         src="https://water-api.corps.cloud/charts/bluestone-dam?format=svg"
//         alt="Browser fail"
//       />
//     </object>
//   </div>;
// }

export default function Map() {
  // set intial state
  const [features, setFeatures] = useState([]);

  // initialization - retrieve GeoJSON features from Mock JSON API get features from mock
  //  GeoJson API (read from flat .json file in public directory)
  useEffect(() => {
    fetch('/mock-geojson-api.json')
      .then((response) => response.json())
      .then((fetchedFeatures) => {
        // parse fetched geojson into OpenLayers features
        //  use options to convert feature from EPSG:4326 to EPSG:3857
        const wktOptions = {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        };
        const parsedFeatures = new GeoJSON().readFeatures(
          fetchedFeatures,
          wktOptions
        );

        // set features into state (which will be passed into OpenLayers
        //  map component as props)
        setFeatures(parsedFeatures);
      });
  }, []);

  return (
    <div className="mx-auto px-4 lg:max-w-screen-2xl lg:px-0">
      <MapWrapper features={features} />
    </div>
  );
}
