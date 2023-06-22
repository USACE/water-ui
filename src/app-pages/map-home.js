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
      <div className="">
        <div className="relative h-[500px] w-auto lg:h-[900px]">
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
      </div>
    </>
  );
}
