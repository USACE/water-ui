import { useEffect, useState } from 'react';
import { useConnect } from 'redux-bundler-hook';
import PageWrapper from '../app-pages/page-wrapper';
import Accordion from '../app-components/accordion';
import { BiHelpCircle } from 'react-icons/bi';

export default function Help() {
  const { urlObject } = useConnect('selectUrlObject');
  const [faqs, setFaqs] = useState();

  const AnswerWrapper = ({ children }) => {
    return (
      <div className='border-2 border-gray-200 bg-white p-4 text-base'>
        {children}
      </div>
    );
  };

  // @TODO
  // Currently unable to expand another section from the footer link if already
  // on the help page

  useEffect(() => {
    console.log(urlObject?.hash);

    const _faqs = [
      {
        title: 'Is this data considered official?',
        content: (
          <AnswerWrapper>
            <p>
              No, all data contained herein is preliminary in nature and
              therefore subject to change. The data is for general information
              purposes ONLY and SHOULD NOT be used in technical applications
              such as, but not limited to: studies, designs or critical decision
              support.
            </p>
          </AnswerWrapper>
        ),
        defaultOpen: urlObject?.hash === '#disclaimer' || false,
        display: true,
      },
      {
        title: 'Is there an API to access A2W data?',
        content: (
          <AnswerWrapper>
            Yes, interactive API documentation is available{' '}
            <a
              href='https://cwms-data.usace.army.mil/cwms-data/swagger-ui.html'
              target='_blank'
              rel='noreferrer'
              className='text-blue-500 hover:underline'
            >
              here
            </a>
            .
          </AnswerWrapper>
        ),
        defaultOpen: false,
        display: true,
      },
      {
        title: 'How can I download timeseries data from this website?',
        content: (
          <AnswerWrapper>
            Please see the {''}
            <a href='/data' className='text-blue-500 hover:underline'>
              data resources page
            </a>
            .
          </AnswerWrapper>
        ),
        defaultOpen: false,
        display: true,
      },
      {
        title: 'Who should I contact for more questions?',
        content: (
          <AnswerWrapper>
            For more questions please contact{' '}
            <a
              href='mailto:water@usace.army.mil'
              className='text-blue-500 hover:underline'
            >
              water@usace.army.mil
            </a>
          </AnswerWrapper>
        ),
        defaultOpen: urlObject?.hash === '#contact' || false,
        display: true,
      },
    ];

    setFaqs(_faqs);
  }, [urlObject]);

  return (
    <PageWrapper
      title='Help Topics'
      subTitle={null}
      isLoading={false}
      Icon={BiHelpCircle}
    >
      <div className='px-2 py-2'>
        <div className='mx-auto max-w-7xl py-4'>
          <Accordion sections={faqs} />
        </div>
      </div>
    </PageWrapper>
  );
}
