//import { useEffect } from 'react';
import { useConnect } from 'redux-bundler-hook';

export default function WatershedHome() {
  const { providerByRoute: provider, doUpdateUrl } = useConnect(
    'selectProviderByRoute',
    'doUpdateUrl'
  );

  doUpdateUrl('/overview/' + provider?.slug);

  return null;
}
