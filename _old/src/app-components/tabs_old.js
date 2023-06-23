import { Tab } from '@headlessui/react';

export default function TabsComponent({ tabs }) {
  //   const tabs = [
  //     { name: 'Dam Profile', content: 'tab 1 content' },
  //     { name: 'Tab 2', content: 'tab 2 content' },
  //     { name: 'Tab 3', content: 'tab 3 content' },
  //   ];
  return (
    <div className="text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <Tab.Group
        defaultIndex={0}
        onChange={(index) => {
          console.log('Changed selected tab to:', index);
        }}
      >
        <Tab.List className="-mb-px flex flex-wrap border-b-2 border-gray-300">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className="mr-1 rounded-t-md border-2 border-b-0 border-gray-200 p-4 ui-selected:-mb-1 ui-selected:border-gray-200 ui-selected:bg-white ui-selected:text-gray-900 ui-not-selected:bg-gray-200 ui-not-selected:text-gray-500 ui-active:bg-gray-800"
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.name} className="bg-white p-0">
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
