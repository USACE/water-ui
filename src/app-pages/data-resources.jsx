import PageWrapper from '../app-pages/page-wrapper';
import ExportTimeseriesGif from '../images/export-location-timeseries.gif';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { HiOutlineBars3 } from 'react-icons/hi2';

export default function DataResources() {
  return (
    <PageWrapper
      title='Data Resources'
      subTitle={null}
      isLoading={false}
      Icon={AiOutlineCloudDownload}
    >
      <div className='bg-white shadow'>
        <div className='flex flex-wrap'>
          <div className='w-full p-5 lg:w-1/3'>
            <p>
              Downloading timeseries data can be done from the location detail
              page. You can use either method below:
            </p>
            <h4 className='mt-5 text-lg font-bold text-gray-600'>
              Download from Timeseries Chart
            </h4>
            <ol className='list-inside list-decimal border-2 border-gray-200 bg-gray-100 p-2 leading-8 shadow'>
              <li>
                Select the <span className='font-bold'>Timeseries</span> tab
              </li>
              <li>
                Once the timeseries data has loaded, open the chart menu using{' '}
                <HiOutlineBars3 className='inline' size={25} />
              </li>
              <li>Click Download CSV or XLS</li>
              <p className='mt-2 text-sm italic'>
                The time window can be adjusted using the 7day, 14day, last
                month buttons
              </p>
            </ol>
            <h4 className='mt-5 text-lg font-bold text-gray-600'>
              Download from Timeseries Sources
            </h4>
            <ol className='list-inside list-decimal border-2 border-gray-200 bg-gray-100 p-2 leading-8 shadow'>
              <li>
                On a desktop or larger screen, expand the{' '}
                <span className='font-bold'>Timeseries Sources</span> menu on
                the right side.
              </li>
              <li>
                Select the desired parameter (stage, flow, etc), then format
                (JSON or CSV)
              </li>
              <p className='mt-2 text-sm italic'>
                The time window can be adjusted manually in the url created by
                each icon.
              </p>
            </ol>
          </div>
          <div className='w-full p-5 lg:w-2/3'>
            <img
              src={ExportTimeseriesGif}
              alt='Animated Display of Timeseries Export'
            />
          </div>
        </div>
        {/* test
        <div className='mx-auto max-w-7xl py-4'>data here</div> */}
      </div>
    </PageWrapper>
  );
}
