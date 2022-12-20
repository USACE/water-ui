import ConditionalWrapper from '../utils/conditional-wrapper';
import Breadcrumb from './breadcrumb';
import Modal from './modal';

function Layout({ children }) {
  return (
    <>
      <Modal />
      {children}
    </>
  );
}

function Header({ showBreadcrumb = true, children }) {
  return (
    <header style={{ marginTop: 32 }} className="container">
      <ConditionalWrapper
        condition={showBreadcrumb}
        wrapper={(children) => <hgroup>{children}</hgroup>}
      >
        <h3 style={{ color: 'gray' }}>Access to Water Admin</h3>
        {showBreadcrumb && <Breadcrumb />}
      </ConditionalWrapper>
      {children}
    </header>
  );
}

function Footer({ children }) {
  return (
    <footer className="container">
      <footer>
        <cite> - footer</cite>
      </footer>
      {children}
    </footer>
  );
}

function Main({ children }) {
  return <main className="container">{children}</main>;
}

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Main = Main;

export default Layout;
