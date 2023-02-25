import { useMemo } from 'react';
import Accordion from '../accordion';
import SimpleTable from '../table-simple';
import StackedParameterList from '../stacked-parameter-list';
import { GrDocumentDownload } from 'react-icons/gr';

export default function LocationSideBarAccordian({ location }) {
  const Metadata = ({ metadata }) => {
    //convert object into list with key pairs
    const meta_array = useMemo(
      () => [
        { name: 'State', value: metadata?.state_name },
        { name: 'Provider', value: metadata?.provider_name },
        {
          name: 'Project Purpose',
          value: metadata?.attributes?.project_purpose,
        },
      ],
      [metadata]
    );

    return (
      <SimpleTable
        headers={['Name', 'Value']}
        items={meta_array}
        itemFields={[{ key: 'name' }, { key: 'value' }]}
      />
    );
  };

  const Levels = ({ levels }) => {
    console.log('hello from levels');
    return (
      <SimpleTable
        headers={['Label', 'Parameter', 'Value', 'Units']}
        items={levels}
        itemFields={[
          {
            key: 'label',
          },
          {
            key: 'parameter',
          },
          {
            key: 'latest_value',
          },
          {
            key: 'units',
          },
        ]}
      />
    );
  };

  const DocumentLink = ({ href, title }) => {
    return (
      <>
        <a className="hover:underline" href={href}>
          <span className="mr-2 inline-block">
            <GrDocumentDownload size={16} />
          </span>
          {title}
        </a>
      </>
    );
  };

  const Documents = ({ docs }) => {
    return (
      <SimpleTable
        headers={[]}
        items={docs}
        itemFields={[
          {
            key: 'title',
            render: (docs) => {
              return <DocumentLink title={docs.title} href={docs.url} />;
            },
          },
        ]}
      />
    );
  };

  // general location sections
  let sections = [
    {
      title: 'Current Values',
      content: <StackedParameterList parameters={location?.timeseries} />,
      defaultOpen: true,
    },
    {
      title: 'Metadata',
      content: <Metadata metadata={location} />,
    },
    {
      title: 'Location Data',
      content: JSON.stringify(location?.geometry),
    },
    {
      title: 'Levels',
      content: <Levels levels={location?.levels} />,
    },
  ];

  // Project only sections
  const projectSections = [
    {
      title: 'Documents',
      content: <Documents docs={location?.documents} />,
    },
  ];

  if (location?.attributes?.kind === 'PROJECT' && location?.documents?.length) {
    sections.push(...projectSections);
  }

  return <Accordion sections={sections} />;
}
