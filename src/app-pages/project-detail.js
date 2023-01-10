import PageHead from '../app-components/page-head';
// import DamProfileMockup from '../images/mockup/dam-profile-chart.png';
import StackedListTwoColumn from '../app-components/stacked-list-two-col';
import TabsComponent from '../app-components/tabs';

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

export default function ProjectDetail() {
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
    <div className="mx-auto px-4 pt-5 lg:max-w-screen-2xl lg:px-0">
      {/* Page Header */}
      <PageHead title="Bluestone Dam" provider="Huntington District" />

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
