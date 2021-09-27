import React from 'react';
import { RedocStandalone } from 'redoc';

const ApiDoc = () => (
  <>
    <RedocStandalone
      spec={
        'https://raw.githubusercontent.com/USACE/water-api/develop/apidoc.yml'
      }
    />
  </>
);

export default ApiDoc;
