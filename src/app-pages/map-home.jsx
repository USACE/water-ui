import { useEffect, useRef } from 'react';
import { Map } from '../app-components/maplibre';
import DetailPanel from '../app-components/map-panel';

export default function MapHome() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return null;
    const map = mapRef.current;
    map.on('load', () => {
      window.map = map;
    });
  }, []);
  return (
    <>
      {/* <div className="relative mx-0 h-[500px] w-auto"> */}

      <div className="flex h-[89vh] bg-gray-200">
        <div className="relative w-auto flex-1 bg-gray-50">
          <Map
            controls={{
              navigation: true,
              geolocation: true,
              scale: true,
              fullscreen: true,
              basemaps: true,
            }}
            mapRef={mapRef}
          >
            <DetailPanel />
          </Map>
        </div>
        {/* <div className="relative w-1/3">
         
        </div> */}

        {/* <div className="bg-green-200">test</div> */}
      </div>
    </>
  );
}
