import { createRouteBundle } from 'redux-bundler';

import Home from '../app-pages/home.js';
import fourOhFour from '../app-pages/404.js';

export default createRouteBundle({
  '/': Home,
  '*': fourOhFour,
});
