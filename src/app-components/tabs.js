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
        <Tab.List className="-mb-px flex flex-wrap border-b-2 border-gray-400">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className="p-4 ui-selected:bg-gray-400 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black ui-active:bg-gray-800"
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.name} className="p-3">
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
