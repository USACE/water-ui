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
        <Tab.List className="mb-2 flex flex-wrap gap-x-1 border-b-2 border-gray-300">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className="flex-auto p-4 shadow ui-selected:border-b-2 ui-selected:border-blue-500 ui-selected:bg-white
               ui-selected:text-gray-900 hover:ui-selected:bg-gray-50 focus:ui-selected:outline-none
               ui-not-selected:border-b-2 ui-not-selected:border-gray-200 ui-not-selected:bg-white ui-not-selected:text-gray-400
               hover:ui-not-selected:bg-gray-50 hover:ui-not-selected:text-gray-900 ui-active:bg-gray-800"
            >
              <div className="flex justify-center">
                <div className="mr-2">{tab.icon}</div>
                <div className="">{tab.name}</div>
              </div>
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
