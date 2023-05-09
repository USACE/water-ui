import { useConnect } from 'redux-bundler-hook';
import TabsComponent from '../../../app-components/tabs';
import { GrLocation } from 'react-icons/gr';
import ProjectsTable from '../../../app-components/projects-table';
import ProviderLocationList2 from './locations-list';
import { FcDam } from 'react-icons/fc';
import { Placeholder } from '../../../app-components/content-placeholder';

export default function ProviderLocationsTabs() {
  const { providerLocationsItems: locations } = useConnect(
    'selectProviderLocationsItems'
  );

  const provider_projects = locations.filter(
    (location) => location.kind === 'PROJECT'
  );

  const tabs = [
    // {
    //   name: 'Watersheds',
    //   content: <>'Tab Content'</>,
    //   icon: <GrLocation size={22} />,
    // },

    {
      name: 'Projects',
      content: (
        <Placeholder
          ready={locations?.length}
          rows={10}
          className={'h-96 w-full border-b-2 border-gray-300 bg-gray-100'}
        >
          <ProjectsTable projects={provider_projects} />
        </Placeholder>
      ),
      icon: <FcDam size={22} />,
      badge: { text: provider_projects?.length },
    },
    {
      name: 'All Locations',
      content: <ProviderLocationList2 locations={locations} />,
      icon: <GrLocation size={22} />,
      badge: { text: locations?.length },
    },
  ];

  // if office has no projects, return the location list table only
  return provider_projects?.length ? (
    <TabsComponent tabs={tabs} />
  ) : (
    locations?.length && <ProviderLocationList2 locations={locations} />
  );
}
