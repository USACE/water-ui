import { useConnect } from 'redux-bundler-hook';
import Breadcrumb from '../../app-components/breadcrumb';
import PageHead from '../../app-components/page-head';
// import DamProfileMockup from '../images/mockup/dam-profile-chart.png';
import StackedListTwoColumn from '../../app-components/stacked-list-two-col';
import TabsComponent from '../../app-components/tabs';

export default function ProjectDetail() {
  const { locationByRoute: location } = useConnect('selectLocationByRoute');

  const DamProfileChart = () => (
    <div className="h-72 sm:h-80 lg:h-128">
      <object
        type="image/svg+xml"
        data="https://water-api.corps.cloud/charts/bluestone-dam?format=svg"
        className="h-full w-full"
      >
        {/* <img
          src="https://water-api.corps.cloud/charts/bluestone-dam?format=svg"
          alt="Browser fail"
        /> */}
      </object>
    </div>
  );
  const tabs = [
    {
      name: 'Dam Profile',
      content: <DamProfileChart />,
    },
    { name: 'Tab 2', content: 'tab 2 content' },
    { name: 'Tab 3', content: 'tab 3 content' },
  ];

  return (
    <div className="mx-auto px-4 lg:max-w-screen-2xl lg:px-0">
      <div className="mb-8 px-8 py-5">
        <Breadcrumb />
      </div>
      {/* Page Header */}
      <PageHead
        title={location && location.attributes.public_name}
        subTitle={
          <a href="/" className="text-gray-900">
            Provided by {location && location.provider_name}
          </a>
        }
      />

      <div className="">
        <div className="mt-8 flex-none md:flex md:gap-x-8">
          <div className="flex-auto lg:w-1/3">
            <StackedListTwoColumn />
          </div>
          <div className="flex-auto bg-white p-2 lg:w-2/3">
            {/* <img src={DamProfileMockup} alt="Dam Profile Chart" /> */}
            <TabsComponent tabs={tabs} />
          </div>
        </div>
      </div>
    </div>
  );
}
