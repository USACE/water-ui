import { Helmet } from 'react-helmet-async';

export default function PageTitle({ title, useDefault = false }) {
  const defaultTitle = 'Water Data - U.S. Army Corps of Engineers';
  if (!title) {
    title = 'Loading...';
  }
  if (useDefault) {
    title = defaultTitle;
  }
  return (
    <Helmet titleTemplate={`%s - ${defaultTitle}`} defaultTitle={defaultTitle}>
      <title>{title}</title>
    </Helmet>
  );
}
