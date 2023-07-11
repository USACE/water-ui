import { useEffect, useRef } from 'react';
import { Map } from '../app-components/maplibre';
import DetailPanel from '../app-components/map/map-panel';

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
      <div className='absolute bottom-0 left-0 right-0 top-24 flex flex-col lg:flex-row '>
        <div className='relative h-full w-full'>
          <Map
            controls={{
              navigation: true,
              geolocation: true,
              scale: true,
              fullscreen: true,
              basemaps: true,
              attribution: true,
            }}
            mapRef={mapRef}
          ></Map>
        </div>
        <DetailPanel />
      </div>
    </>
  );
}
