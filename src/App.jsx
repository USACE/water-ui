import Layout from './app-components/layout.jsx';
import { useConnect } from 'redux-bundler-hook';
import DisclaimereModal from './app-pages/disclaimer-modal.jsx';

export default function App() {
  const {
    route: Route,
    pathname,
    isMapView,
    isDisclaimerAcknowledged,
    //authIsLoggedIn: isLoggedIn,
  } = useConnect(
    'selectRoute',
    'selectPathname',
    'selectIsMapView',
    'selectIsDisclaimerAcknowledged'
  );

  return (
    <Layout>
      <Layout.Header showBreadcrumb={pathname !== '/'}></Layout.Header>
      <Layout.Main>
        <Route />
      </Layout.Main>
      <DisclaimereModal show={!isDisclaimerAcknowledged} />
      {!isMapView && <Layout.Footer />}
    </Layout>
  );
}
