import Breadcrumb from '../app-components/breadcrumb';
import PageHead from '../app-components/page-head';
import PageTitle from '../app-components/page-title';
import BarLoader from 'react-spinners/BarLoader';

export default function PageWrapper({
  title,
  subTitle,
  children,
  isLoading = false,
}) {
  return (
    <div className="mx-auto px-4 pb-4 dark:bg-gray-800 lg:max-w-screen-2xl lg:px-8">
      <PageTitle title={title} subTitle={subTitle} />

      {/* Page Breadcrumbs */}
      <div className="mb-4 py-5">
        <Breadcrumb />
      </div>
      {/* Page Header */}

      <PageHead title={title} subTitle={subTitle} />

      {/* <div className="bg-gray-300 text-center align-bottom">
        {!isLoading ? 'loading...' : null}
      </div> */}
      <div className="bg-gray-300 text-center align-bottom">
        <BarLoader
          cssOverride={{ width: '100%' }}
          height={4}
          color={'#457be6'}
          loading={isLoading}
          speedMultiplier={1.5}
          aria-label="Loading Bar"
          data-testid="loader"
        />
      </div>

      {/* Main Page Content */}
      <div className="min-h-96">{children}</div>
    </div>
  );
}
