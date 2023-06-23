import Layout from './app-components/layout.jsx';
import { useConnect } from 'redux-bundler-hook';

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
