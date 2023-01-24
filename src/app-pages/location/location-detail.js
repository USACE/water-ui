import { useConnect } from 'redux-bundler-hook';
import DamProfileMockup from '../../images/mockup/dam-profile-chart.png';
import StackedParameterList from '../../app-components/stacked-parameter-list';
//import TabsComponent from '../../app-components/tabs';
import SimpleStageHydrographChart from '../../images/mockup/simple-stage-hydrograph-chart.png';
//import CardSimple from '../../app-components/card-simple';
import PageWrapper from '../page-wrapper';
import Accordion from '../../app-components/accordion';

export default function ProjectDetail() {
  const { providerLocationByRoute: location } = useConnect(
    'selectProviderLocationByRoute'
  );

  // const tabs = [
  //   {
  //     name: 'Dam Profile',
  //     content: '',
  //   },
  //   { name: 'Tab 2', content: 'tab 2 content' },
  //   { name: 'Tab 3', content: 'tab 3 content' },
  // ];

  return (
    <PageWrapper
      title={location?.attributes.public_name}
      subTitle={`provided by ${location?.provider_name}`}
    >
      <div className="mt-8 flex-none md:gap-x-8 lg:flex">
        <div className="flex-auto lg:w-2/3">
          {location?.attributes.kind === 'PROJECT' ? (
            <img
              src={DamProfileMockup}
              className="w-full"
              alt="Dam Profile Chart"
            />
          ) : (
            <img
              src={SimpleStageHydrographChart}
              className="w-full"
              alt="sample graph"
            />
          )}
          {location && location.timeseries && (
            <StackedParameterList parameters={location.timeseries} />
          )}
        </div>
        <div className="flex-auto bg-white p-2 lg:w-1/3">
          {/* <TabsComponent tabs={tabs} /> */}
          <Accordion
            sections={[
              { title: 'Metadata', content: 'sample data' },
              { title: 'Location Data', content: 'sample data' },
              { title: 'Timeseries', content: 'sample data' },
            ]}
          />
          {/* <CardSimple title="test">{JSON.stringify(location)}</CardSimple> */}
        </div>
      </div>
    </PageWrapper>
  );
}
