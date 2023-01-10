import { createRouteBundle } from 'redux-bundler';

import Home from '../app-pages/home.js';
import fourOhFour from '../app-pages/404.js';
import ProjectDetail from '../app-pages/project-detail';

export default createRouteBundle({
  '/': Home,
  '/:provider/:provider_slug/projects/:project_slug': ProjectDetail,
  '*': fourOhFour,
});
