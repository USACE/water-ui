import { Disclosure } from '@headlessui/react';
// import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { HiChevronRight } from 'react-icons/hi2';

export default function Accordion({ sections }) {
  return (
    <>
      {sections &&
        sections.map((section) => (
          <Disclosure key={section.title} defaultOpen={section.defaultOpen}>
            <Disclosure.Button className='text-md mb-1 flex w-full justify-between rounded bg-gray-200 px-4 py-2 text-left font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 ui-open:mb-0'>
              <span>
                {section.title}
                {section?.count?.value ? (
                  <span
                    className={`ml-1 rounded-lg bg-gray-400 px-1 text-xs text-white ${section.count.className}`}
                  >
                    {section?.count?.value}
                  </span>
                ) : null}
              </span>
              <HiChevronRight className='w-6 ui-open:rotate-90 ui-open:transform' />
            </Disclosure.Button>
            <Disclosure.Panel className='px-0 py-0 text-sm text-gray-500'>
              {section.content}
            </Disclosure.Panel>
          </Disclosure>
        ))}
    </>
  );
}
