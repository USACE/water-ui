import Layout from './app-components/layout.js';
import { useConnect } from 'redux-bundler-hook';

// import Login from './app-pages/login.js';

// Primary .scss stylesheet for the application
// import './scss/pico-bootstrap-grid.scss';

export default function App() {
  const {
    route: Route,
    pathname,
    //authIsLoggedIn: isLoggedIn,
  } = useConnect('selectRoute', 'selectPathname');

  return (
    <Layout>
      <Layout.Header showBreadcrumb={pathname !== '/'}></Layout.Header>
      <Layout.Main>
        <Route />
      </Layout.Main>
      <Layout.Footer />
    </Layout>
  );
}
