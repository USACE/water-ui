import React, { useRef } from 'react';
import { useConnect } from 'redux-bundler-hook';

//import Panel from './panel';
//import PanelGroup from '../../app-components/panel-group';
import Map from '../app-components/classMap';
//import MapLegend from './map-legend';
//import MapTools from './map-tools';
//import Visualizations from './explorer-visualizations';
//import useWindowListener from '../../customHooks/useWindowListener';
//import { classArray } from '../../utils';

//import './explorer.scss';

export default function MapHome() {
  const {
    doMapsInitialize,
    doMapsShutdown,
    //exploreMapKey: mapKey,
    mapsObject,
  } = useConnect(
    'doMapsInitialize',
    'doMapsShutdown',
    //'selectExploreMapKey',
    'selectMapsObject'
  );

  //const [landscapeMode, setLandscapeMode] = useState(false);
  const mapRef = useRef();

  // const toggleLandscape = useCallback(
  //   (e) => {
  //     if (e.keyCode === 86 && e.shiftKey) {
  //       setLandscapeMode(!landscapeMode);
  //     }
  //   },
  //   [setLandscapeMode, landscapeMode]
  // );

  //useWindowListener('keydown', toggleLandscape);

  // const hasDevBanner = process.env.REACT_APP_DEVELOPMENT_BANNER;
  // const cls = classArray([
  //   'explorer-container',
  //   hasDevBanner && 'with-banner',
  // ]);

  return (
    //   <div className={cls} key={Number(landscapeMode)}>
    <div className="mx-auto w-full px-4 lg:max-w-full lg:px-0">
      {/* <PanelGroup
          borderColor='#ccc'
          spacing={2}
          direction={landscapeMode ? 'column' : 'row'}
          onUpdate={(_data) =>
            mapRef && mapRef.current && mapRef.current.updateSize()
          }
        > */}
      {/* <Panel> */}
      <Map
        ref={mapRef}
        //mapKey={mapKey}
        options={{ center: [-98.6, 39.8], zoom: 5 }}
        doMapsInitialize={doMapsInitialize}
        doMapsShutdown={doMapsShutdown}
        mapsObject={mapsObject}
      />
      {/* <MapTools />
            <MapLegend /> */}
      {/* </Panel>
          <Panel className='overflow-auto'>
            <Visualizations />
          </Panel>
        </PanelGroup> */}
    </div>
  );
}
