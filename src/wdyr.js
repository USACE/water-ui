import React from 'react';

// "Why did you render" debug tool
// https://github.com/welldone-software/why-did-you-render
// https://blog.logrocket.com/debugging-react-performance-issues-with-why-did-you-render/

// Make sure to only include the library in development
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
