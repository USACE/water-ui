import Breadcrumb from '../app-components/breadcrumb';
import PageHead from '../app-components/page-head';
import PageTitle from '../app-components/page-title';

export default function PageWrapper({ title, subTitle, children }) {
  return (
    <div className="mx-auto px-4 pb-4 dark:bg-gray-800 lg:max-w-screen-2xl lg:px-8">
      <PageTitle title={title} subTitle={subTitle} />

      {/* Page Breadcrumbs */}
      <div className="mb-4 py-5">
        <Breadcrumb />
      </div>
      {/* Page Header */}
      <PageHead title={title} subTitle={subTitle} />
      {/* Main Page Content */}
      <div className="min-h-96">{children}</div>
    </div>
  );
}
