import { createRouteBundle } from "redux-bundler";

import Home from "../app-pages/home";
import SignIn from "../app-pages/SignIn";
import SignUp from "../app-pages/SignUp";
import ResetPassword from "../app-pages/ResetPassword";
import OfficeDetail from "../app-pages/OfficeDetail";
import StateDetail from "../app-pages/StateDetail";
import WatershedDetail from "../app-pages/WatershedDetail";
import Map from "../app-pages/map";

export default createRouteBundle({
  "/": Home,
  "/map": Map,
  "/happening": Home,
  "/discovery": Home,
  "/signin": SignIn,
  "/signup": SignUp,
  "/reset-password": ResetPassword,
  "/offices/:officeSymbol": OfficeDetail,
  "/states/:stateSymbol": StateDetail,
  "/watersheds/:watershedSlug": WatershedDetail,
  "*": () => <div>Not Found; 404</div>,
  // '/locations/:slug': LocationSummary,
  // '/offices/:officeSymbol/locations/:slug': LocationSummary,
  // '/admin': AdminDashboard,
});
