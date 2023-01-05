// import ConditionalWrapper from '../utils/conditional-wrapper';
// import Breadcrumb from './breadcrumb';
import Modal from './modal';
import MyHeader from './header';

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
    <footer className="container">
      <footer>
        <cite> - footer</cite>
      </footer>
      {children}
    </footer>
  );
}

function Main({ children }) {
  return <main className="">{children}</main>;
}

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Main = Main;

export default Layout;
