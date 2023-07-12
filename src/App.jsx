import Layout from './app-components/layout.jsx';
import { useConnect } from 'redux-bundler-hook';
import TermsOfServiceModal from './app-pages/terms-service-modal.jsx';

export default function App() {
  const {
    route: Route,
    pathname,
    isMapView,
    isTermsOfServiceAcknowledged,
    //authIsLoggedIn: isLoggedIn,
  } = useConnect(
    'selectRoute',
    'selectPathname',
    'selectIsMapView',
    'selectIsTermsOfServiceAcknowledged'
  );

  return (
    <Layout>
      <Layout.Header showBreadcrumb={pathname !== '/'}></Layout.Header>
      <Layout.Main>
        <Route />
      </Layout.Main>
      <TermsOfServiceModal show={!isTermsOfServiceAcknowledged} />
      {!isMapView && <Layout.Footer />}
    </Layout>
  );
}
