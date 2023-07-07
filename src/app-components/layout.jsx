// import ConditionalWrapper from '../utils/conditional-wrapper';
// import Breadcrumb from './breadcrumb';
import Modal from './modal';
import MyHeader from './header';
import MyFooter from './footer/footer';

function Layout({ children }) {
  return (
    <>
      <Modal />
      {children}
    </>
  );
}

function Header() {
  return <MyHeader />;
}

function Footer() {
  return <MyFooter />;
}

function Main({ children }) {
  return <main className="mb-5 bg-gray-100 dark:bg-gray-800">{children}</main>;
}

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Main = Main;

export default Layout;
