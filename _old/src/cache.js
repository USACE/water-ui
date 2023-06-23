import { getConfiguredCache } from 'money-clip';
import pkg from '../package.json';

const cacheKey = `${pkg.name}-${pkg.version}`;

export default getConfiguredCache({
  // 24 Hours
  maxAge: 1000 * 60 * 60 * 24,
  version: cacheKey,
});
