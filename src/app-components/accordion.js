import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Accordion({ sections }) {
  return (
    <>
      {sections &&
        sections.map((section) => (
          <Disclosure key={section.title} defaultOpen={section.defaultOpen}>
            <Disclosure.Button className="text-md mb-2 flex w-full justify-between rounded bg-gray-200 px-4 py-2 text-left font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              {section.title}
              <ChevronRightIcon className="w-6 ui-open:rotate-90 ui-open:transform" />
            </Disclosure.Button>
            <Disclosure.Panel className="px-2 py-2 text-sm text-gray-500">
              {section.content}
            </Disclosure.Panel>
          </Disclosure>
        ))}
    </>
  );
}
