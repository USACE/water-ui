import { useState, useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';
import TabsComponent from '../../app-components/tabs';
import PageWrapper from '../page-wrapper';
import LocationTimeseriesCharts from '../../app-components/charts/location-timeseries-charts';
//import SimpleStats from '../../app-components/stats-simple';
import DamProfileChart from '../../app-components/charts/dam-profile-chart/chart';
import { BiExpandHorizontal } from 'react-icons/bi';
import LocationSideBarAccordian from '../../app-components/location-detail/sidebar-accordian';
import ProjectStats from '../../app-components/location-detail/project-stats';
// import { subDays, subHours, parseJSON, differenceInDays } from 'date-fns';
// import { formatInTimeZone } from 'date-fns-tz';
import {
  LastValueSet,
  LookBackValueSet,
} from '../../helpers/timeseries-helper';

export default function ProjectDetail() {
  const {
    providerLocationByRoute: location,
    providerLocationIsLoading,
    providerByRoute: provider,
    providerTimeseriesValuesItemsObject: tsvObj,
    doProviderTimeseriesValuesFetchById,
    timeseriesDateRange: dateRange,
  } = useConnect(
    'selectProviderLocationByRoute',
    'selectProviderLocationIsLoading',
    'selectProviderByRoute',
    'selectProviderTimeseriesValuesItemsObject',
    'doProviderTimeseriesValuesFetchById',
    'selectTimeseriesDateRange'
  );

  console.log('############# LOCATION DETAIL RENDER #################');

  //const [location, setLocation] = useState(_location);
  const [expanded, setExpanded] = useState(false);
  const [timeseriesIds, setTimeseriesId] = useState([]);
  //const [measurements, setMeasurements] = useState([]);
  // const [dateRange, setDateRange] = useState([
  //   subDays(new Date(), 7),
  //   new Date(),
  // ]);

  // console.log('----DATE RANGE---');
  // console.log(dateRange);
  // console.log(differenceInDays(dateRange[1], dateRange[0]));

  /** Load specific timeseries ids into state when new configurations are loaded */
  useEffect(() => {
    const timeseriesIdArray = location?.timeseries
      ? location?.timeseries?.map((ts) => {
          return ts.tsid;
        })
      : [];

    setTimeseriesId(timeseriesIdArray);
  }, [location]);

  /** Fetch the timeseries measurements in regards to date range */
  useEffect(() => {
    location &&
      timeseriesIds &&
      timeseriesIds.forEach((id) => {
        // console.log(`fetching ${id}`);
        doProviderTimeseriesValuesFetchById({ timeseriesId: id, dateRange });
        //doProviderTimeseriesValuesFetch();
      });
  }, [location, timeseriesIds, dateRange, doProviderTimeseriesValuesFetchById]);

  // useEffect(() => {
  //   // Note: timeSeriesValues may contain the more tsids than we want for this location
  //   // Filter is down by the "timeseriesIds" array which only includes tsids for the
  //   // current location

  //   console.log('--filtering timeseries values--');
  //   const locationTsValues = timeSeriesValues.filter((v) =>
  //     timeseriesIds.includes(v.key)
  //   );
  //   console.log(locationTsValues);

  //   setMeasurements(locationTsValues);
  // }, [timeSeriesValues, timeseriesIds]);

  useEffect(() => {
    // console.log('--hello world--');
    // console.log(location?.timeseries);
    // console.log('--tsvObj--');
    // console.log(tsvObj);
    if (!tsvObj || !location) {
      console.log('--returning--');
      return;
    }
    let temp_location = location;
    let temp_timeseries = location?.timeseries?.map((obj) => {
      // console.log('--obj--');
      // console.log(obj);

      // console.log('--tsvObj[obj.tsid]--');
      // console.log(tsvObj && tsvObj[obj.tsid]);
      const tsvArray = tsvObj ? tsvObj[obj.tsid]?.values : null;

      if (tsvArray?.length) {
        const lastRecord = LastValueSet(tsvArray);
        obj['latest_time'] = lastRecord.latest_time || null;
        obj['latest_value'] = lastRecord.latest_value || null;
        const lookBackRecord = LookBackValueSet(tsvArray, 24);
        obj['delta24hr'] =
          lookBackRecord &&
          (lastRecord.latest_value - lookBackRecord.latest_value).toFixed(2);
        obj['unit'] = tsvObj[obj.tsid]?.unit;
      }

      return obj;
    });
    temp_location.timeseries = temp_timeseries;
    // console.log('--temp location--');
    // console.log(temp_location);
    location.timeseries = temp_timeseries;
    //setLocation(temp_location);
  }, [location, location?.timeseries, tsvObj]);

  if (!location && !providerLocationIsLoading) {
    return (
      <PageWrapper title="404 - Location Not Found" subTitle="">
        <div className="mx-auto h-96">Unable to find your location.</div>
      </PageWrapper>
    );
  }

  const isProject = location?.kind === 'PROJECT' && location?.levels?.length;

  // const ProjectStatusDescription = () => (
  //   <div className="sr-only bg-red-100 p-10" aria-label="Project Status">
  //     Dewey Lake is located in the state of Kentucky. The current pool elevation
  //     is 646.35 ft. The lake has decreased in elevation 0.37 ft in the last 24
  //     hours. The project is currently utilizing 3.3% of it's total flood
  //     storage.
  //   </div>
  // );

  const tabs = [
    {
      name: 'Dam Profile',
      content: (
        <>
          {/* <ProjectStatusDescription /> */}

          <DamProfileChart />
        </>
      ),
    },

    {
      name: 'Timeseries',
      content:
        location && location?.timeseries?.length ? (
          <div className="bg-white pt-5">
            <LocationTimeseriesCharts location={location} />
          </div>
        ) : null,
    },
  ];

  const handleExpandToggle = () => {
    // Not sure this works as intended
    setExpanded(!expanded);
    window.dispatchEvent(new Event('resize'));
    return;
  };

  const ToggleExpandButton = () => {
    return (
      <div className="mb-2 hidden w-full lg:flex ">
        <BiExpandHorizontal
          size={32}
          title="Expand or Collapse this section"
          className="-mb-0 ml-auto cursor-pointer rounded-md border-2 border-gray-100 bg-white px-1 text-gray-400 shadow-md hover:text-gray-900"
          onClick={handleExpandToggle}
        />
      </div>
    );
  };

  return (
    <PageWrapper
      title={location?.public_name}
      subTitle={`provided by ${provider?.name}`}
    >
      <div
        className={`mt-0 duration-300 ease-in-out md:gap-x-8 ${
          expanded ? 'lg:flex-wrap' : 'lg:flex'
        } flex flex-col-reverse lg:flex-row`}
      >
        <div className={`flex-auto ${expanded ? 'lg:w-full' : 'lg:w-3/5'}`}>
          <ToggleExpandButton />

          {isProject ? (
            <>
              <div className="mb-5">
                {isProject && <ProjectStats location={location} />}
              </div>
              <div className="">
                <TabsComponent tabs={tabs} />
              </div>
            </>
          ) : (
            location && <LocationTimeseriesCharts location={location} />
          )}
        </div>

        <div className={`flex-auto p-0 ${expanded ? 'xl:w-full' : 'xl:w-1/5'}`}>
          <LocationSideBarAccordian location={location} />
        </div>
      </div>
    </PageWrapper>
  );
}
