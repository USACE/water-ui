import React from 'react';
import { connect } from 'redux-bundler-react';

// https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
const RoleFilter = connect(
  'selectAuthRoles',
  ({ authRoles, showForRoles, children }) => (
    <>{authRoles.some((r) => showForRoles.includes(r)) ? children : null}</>
  )
);

export default RoleFilter;
