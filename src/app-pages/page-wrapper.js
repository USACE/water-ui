import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../app-components/breadcrumb';
import PageHead from '../app-components/page-head';

export default function PageWrapper({ title, subTitle, children }) {
  return (
    <div className="mx-auto px-4 pb-4 lg:max-w-screen-2xl lg:px-8">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {/* Page Breadcrumbs */}
      <div className="mb-4 py-5">
        <Breadcrumb />
      </div>
      {/* Page Header */}
      <PageHead title={title} subTitle={subTitle} />
      <div className="">{children}</div>
    </div>
  );
}
