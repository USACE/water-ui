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

function Header({ showBreadcrumb = true, children }) {
  return (
    // <header style={{ marginTop: 32 }} className="container bg-slate-300">
    //   <ConditionalWrapper
    //     condition={showBreadcrumb}
    //     wrapper={(children) => <hgroup>{children}</hgroup>}
    //   >
    //     <h3>Access to Water</h3>

    //     {showBreadcrumb && <Breadcrumb />}
    //   </ConditionalWrapper>
    //   {children}
    // </header>
    <MyHeader />
  );
}

function Footer({ children }) {
  return (
    // <footer className="container">
    //   <footer>
    //     <cite> - footer</cite>
    //   </footer>
    //   {children}
    <MyFooter />
  );
}

function Main({ children }) {
  return <main className="mb-5 bg-gray-100 dark:bg-gray-800">{children}</main>;
}

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Main = Main;

export default Layout;
