import { useEffect, useRef } from 'react';
import { Map } from '../../app-components/maplibre';

export default function MapPreview() {
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
      <div className='relative h-full w-full'>
        <Map
          controls={{
            navigation: false,
            geolocation: false,
            scale: false,
            fullscreen: true,
            basemaps: false,
            attribution: false,
          }}
          mapRef={mapRef}
        ></Map>
      </div>
    </>
  );
}
